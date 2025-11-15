import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  ArrowLeft, 
  ArrowRight, 
  Bot, 
  User, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { onboardingSteps, onboardingStepGroups, OnboardingStepData } from './OnboardingSteps';
import { OnboardingProgress } from './OnboardingProgress';
import { useOnboardingContext } from './OnboardingProvider';

interface EnhancedChatProps {
  onComplete: (data: any) => void;
}

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  stepId?: string;
}

interface FormErrors {
  [key: string]: string;
}

export function EnhancedChat({ onComplete }: EnhancedChatProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    formData, 
    updateFormData, 
    updateStep, 
    markStepComplete,
    autoSave 
  } = useOnboardingContext();

  const currentStep = getVisibleSteps()[currentStepIndex];
  const totalVisibleSteps = getVisibleSteps().length;
  const progressPercentage = ((currentStepIndex + 1) / totalVisibleSteps) * 100;

  // Filter out skipped steps based on current answers
  function getVisibleSteps(): OnboardingStepData[] {
    return onboardingSteps.filter(step => {
      if (!step.skipCondition) return true;
      return !step.skipCondition(answers);
    });
  }

  // Generate progress steps for OnboardingProgress component
  function getProgressSteps() {
    return onboardingStepGroups.map((group, index) => ({
      id: group.id,
      title: group.title,
      subtitle: group.subtitle,
      completed: currentStepIndex >= getStepGroupEndIndex(group.id),
      active: isStepGroupActive(group.id)
    }));
  }

  function getStepGroupEndIndex(groupId: string): number {
    const group = onboardingStepGroups.find(g => g.id === groupId);
    if (!group) return 0;
    const visibleSteps = getVisibleSteps();
    const lastStepId = group.steps[group.steps.length - 1];
    return visibleSteps.findIndex(step => step.id === lastStepId);
  }

  function isStepGroupActive(groupId: string): boolean {
    const group = onboardingStepGroups.find(g => g.id === groupId);
    if (!group) return false;
    const visibleSteps = getVisibleSteps();
    const currentStepId = visibleSteps[currentStepIndex]?.id;
    return group.steps.includes(currentStepId);
  }

  useEffect(() => {
    if (currentStep && messages.length === 0) {
      // Initial greeting
      addBotMessage("Hi there! 👋 I'm here to help you get started with your project. Let's begin by learning about your business.");
      setTimeout(() => {
        addBotMessage(currentStep.question, currentStep.id);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addBotMessage = (content: string, stepId?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        stepId
      }]);
      setIsTyping(false);
    }, 800 + Math.random() * 400); // Simulate typing delay
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const validateStep = (step: OnboardingStepData, value: any): string | null => {
    if (!step.validation) return null;

    if (step.validation.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return step.validation.message || `${step.title} is required`;
    }

    if (typeof value === 'string') {
      if (step.validation.minLength && value.length < step.validation.minLength) {
        return step.validation.message || `Minimum ${step.validation.minLength} characters required`;
      }
      if (step.validation.maxLength && value.length > step.validation.maxLength) {
        return step.validation.message || `Maximum ${step.validation.maxLength} characters allowed`;
      }
      if (step.validation.pattern && !new RegExp(step.validation.pattern).test(value)) {
        return step.validation.message || 'Invalid format';
      }
    }

    return null;
  };

  const handleStepSubmission = async (value: any) => {
    const error = validateStep(currentStep, value);
    
    if (error) {
      setErrors({ [currentStep.id]: error });
      return;
    }

    setErrors({});
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);

    // Update form data for context
    updateFormData(newAnswers);
    markStepComplete(currentStep.id);
    await autoSave();

    // Add user response to chat
    let displayValue = value;
    if (Array.isArray(value)) {
      displayValue = value.join(', ');
    } else if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    }
    addUserMessage(displayValue.toString());

    // Move to next step or complete
    const visibleSteps = getVisibleSteps();
    if (currentStepIndex < visibleSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setFormValue('');
      setSelectedOptions([]);
      
      setTimeout(() => {
        const nextStep = visibleSteps[currentStepIndex + 1];
        addBotMessage(nextStep.question, nextStep.id);
        if (nextStep.helpText) {
          setTimeout(() => {
            addBotMessage(`💡 ${nextStep.helpText}`);
          }, 1200);
        }
      }, 1500);
    } else {
      // Onboarding complete
      setTimeout(() => {
        addBotMessage("Perfect! 🎉 I have all the information I need. Let me create your personalized project roadmap...");
        setTimeout(() => {
          onComplete(newAnswers);
        }, 2000);
      }, 1000);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const visibleSteps = getVisibleSteps();
      setCurrentStepIndex(prev => prev - 1);
      const prevStep = visibleSteps[currentStepIndex - 1];
      const prevAnswer = answers[prevStep.id];
      
      // Restore previous form state
      if (prevStep.type === 'multiselect' && Array.isArray(prevAnswer)) {
        setSelectedOptions(prevAnswer);
        setFormValue('');
      } else {
        setFormValue(prevAnswer?.toString() || '');
        setSelectedOptions([]);
      }
    }
  };

  const renderFormInput = () => {
    if (!currentStep) return null;

    const error = errors[currentStep.id];

    switch (currentStep.type) {
      case 'text':
        return (
          <div className="space-y-2">
            {currentStep.id === 'business_description' || currentStep.id === 'additional_info' ? (
              <Textarea
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder={currentStep.placeholder}
                className={`min-h-[100px] ${error ? 'border-destructive' : ''}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleStepSubmission(formValue);
                  }
                }}
              />
            ) : (
              <Input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder={currentStep.placeholder}
                className={error ? 'border-destructive' : ''}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleStepSubmission(formValue);
                  }
                }}
              />
            )}
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div className="space-y-2">
            <Select value={formValue} onValueChange={setFormValue}>
              <SelectTrigger className={error ? 'border-destructive' : ''}>
                <SelectValue placeholder="Choose an option..." />
              </SelectTrigger>
              <SelectContent>
                {currentStep.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            <div className="grid gap-2">
              {currentStep.options?.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedOptions(prev => [...prev, option.value]);
                      } else {
                        setSelectedOptions(prev => prev.filter(v => v !== option.value));
                      }
                    }}
                  />
                  <label htmlFor={option.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {selectedOptions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedOptions.map(value => {
                  const option = currentStep.options?.find(o => o.value === value);
                  return (
                    <Badge key={value} variant="secondary" className="text-xs">
                      {option?.label}
                    </Badge>
                  );
                })}
              </div>
            )}
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div className="flex gap-3">
            <Button
              variant={formValue === 'true' ? 'default' : 'outline'}
              onClick={() => setFormValue('true')}
              className="flex-1"
            >
              Yes
            </Button>
            <Button
              variant={formValue === 'false' ? 'default' : 'outline'}
              onClick={() => setFormValue('false')}
              className="flex-1"
            >
              No
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const canSubmit = () => {
    if (currentStep.type === 'multiselect') {
      return selectedOptions.length > 0;
    }
    if (currentStep.type === 'boolean') {
      return formValue === 'true' || formValue === 'false';
    }
    return formValue.trim().length > 0;
  };

  const submitCurrentStep = () => {
    if (currentStep.type === 'multiselect') {
      handleStepSubmission(selectedOptions);
    } else if (currentStep.type === 'boolean') {
      handleStepSubmission(formValue === 'true');
    } else {
      handleStepSubmission(formValue);
    }
  };

  return (
    <div className="h-[600px] flex flex-col">
      {/* Progress Header */}
      <div className="mb-4 p-4 bg-siso-bg-secondary rounded-lg">
        <OnboardingProgress 
          steps={getProgressSteps()}
          currentStep={currentStepIndex + 1}
          totalSteps={totalVisibleSteps}
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-siso-bg-secondary rounded-lg">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-r from-siso-red to-siso-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-siso-orange text-white ml-auto' 
                  : 'bg-siso-bg-tertiary text-siso-text-primary'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-orange-100' : 'text-siso-text-muted'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-siso-bg-tertiary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-siso-text-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-siso-red to-siso-orange rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-siso-bg-tertiary rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-siso-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-siso-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-siso-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Form Input Area */}
      {currentStep && !isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-siso-bg-secondary rounded-lg p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-siso-text-primary">{currentStep.title}</h3>
            <Badge variant="outline" className="text-xs">
              {currentStepIndex + 1} / {totalVisibleSteps}
            </Badge>
          </div>

          {renderFormInput()}

          <div className="flex gap-2 justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={submitCurrentStep}
              disabled={!canSubmit()}
              className="flex items-center gap-2 bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
            >
              {currentStepIndex === totalVisibleSteps - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}