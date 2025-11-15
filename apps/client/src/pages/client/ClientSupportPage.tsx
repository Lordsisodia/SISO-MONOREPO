
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  HelpCircle, 
  ArrowRight,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Video,
  Calendar,
  Zap,
  Shield,
  Headphones
} from 'lucide-react';
import { ClientDashboardLayout } from "@/components/client/ClientDashboardLayout";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ClientSupportPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const { toast } = useToast();

  // Mock support data - in production, this would come from the database
  const supportStats = {
    avgResponseTime: '2.5 hours',
    onlineAgents: 8,
    ticketsResolved: 247,
    satisfaction: 98
  };

  const supportCategories = [
    { id: 'general', label: 'General Support', icon: HelpCircle, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'technical', label: 'Technical Issues', icon: Zap, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'billing', label: 'Billing & Payments', icon: Shield, color: 'bg-green-500/20 text-green-400' },
    { id: 'feature', label: 'Feature Request', icon: CheckCircle, color: 'bg-purple-500/20 text-purple-400' }
  ];

  const recentTickets = [
    {
      id: '#SP-1247',
      subject: 'Dashboard loading slowly',
      status: 'resolved',
      lastUpdate: '2 hours ago',
      agent: 'Sarah Chen'
    },
    {
      id: '#SP-1243',
      subject: 'API integration question',
      status: 'in_progress',
      lastUpdate: '1 day ago',
      agent: 'Mike Johnson'
    },
    {
      id: '#SP-1239',
      subject: 'Mobile app feedback',
      status: 'closed',
      lastUpdate: '3 days ago',
      agent: 'Alex Rivera'
    }
  ];

  const knowledgeBase = [
    {
      category: 'Getting Started',
      articles: [
        'How to navigate your dashboard',
        'Understanding your project timeline',
        'Setting up notifications',
        'Managing your account settings'
      ]
    },
    {
      category: 'Project Management',
      articles: [
        'Requesting changes to your project',
        'Understanding development phases',
        'Reviewing and approving deliverables',
        'Communication with your team'
      ]
    },
    {
      category: 'Technical',
      articles: [
        'Browser compatibility requirements',
        'Accessing staging environments',
        'Understanding security measures',
        'Performance optimization tips'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We will get back to you shortly",
      });
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <ClientDashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-siso-text">Help & Support Center</h1>
        </motion.div>

        {/* Support Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-siso-bg-secondary border-siso-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-siso-text">
                <Headphones className="h-5 w-5 text-siso-orange" />
                Support Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-xl font-bold text-green-400">{supportStats.avgResponseTime}</div>
                  <div className="text-xs text-siso-text-muted">Avg Response Time</div>
                </div>
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-xl font-bold text-blue-400">{supportStats.onlineAgents}</div>
                  <div className="text-xs text-siso-text-muted">Agents Online</div>
                </div>
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-xl font-bold text-purple-400">{supportStats.ticketsResolved}</div>
                  <div className="text-xs text-siso-text-muted">Tickets Resolved</div>
                </div>
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-xl font-bold text-siso-orange">{supportStats.satisfaction}%</div>
                  <div className="text-xs text-siso-text-muted">Satisfaction Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border hover:border-siso-orange/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-3">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-siso-text">Live Chat</h2>
                    <p className="text-siso-text-muted mb-4">
                      Chat directly with our support team for immediate assistance.
                    </p>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                      Available Now
                    </Badge>
                  </div>
                  <div className="mt-auto">
                    <Button className="w-full bg-siso-orange hover:bg-siso-orange/80">
                      Start Chat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border hover:border-siso-orange/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-3">
                      <Phone className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-siso-text">Phone Support</h2>
                    <p className="text-siso-text-muted mb-4">
                      Call us directly for personalized assistance with your project.
                    </p>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      <Clock className="h-3 w-3 mr-1" />
                      Business Hours
                    </Badge>
                  </div>
                  <div className="mt-auto">
                    <a href="tel:+1234567890" className="block">
                      <Button className="w-full bg-siso-orange hover:bg-siso-orange/80">
                        Call Support
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border hover:border-siso-orange/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-3">
                      <Video className="h-6 w-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-siso-text">Video Call</h2>
                    <p className="text-siso-text-muted mb-4">
                      Schedule a video call with your project manager for detailed discussions.
                    </p>
                    <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule Required
                    </Badge>
                  </div>
                  <div className="mt-auto">
                    <Button className="w-full bg-siso-orange hover:bg-siso-orange/80">
                      Schedule Call
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Support Form and Recent Tickets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-siso-text">
                  <Mail className="h-5 w-5 text-siso-orange" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-siso-text mb-2">
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {supportCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <Button
                            key={category.id}
                            type="button"
                            variant="outline"
                            onClick={() => setSelectedCategory(category.id)}
                            className={cn(
                              "p-3 h-auto flex-col gap-2",
                              selectedCategory === category.id 
                                ? "border-siso-orange bg-siso-orange/10" 
                                : "border-siso-border hover:border-siso-orange/50"
                            )}
                          >
                            <div className={cn("p-2 rounded-lg", category.color)}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <span className="text-xs text-siso-text">{category.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-siso-text mb-1">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What can we help you with?"
                      className="bg-siso-bg border-siso-border"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-siso-text mb-1">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please provide details about your issue or question"
                      rows={6}
                      className="bg-siso-bg border-siso-border"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-siso-orange hover:bg-siso-orange/80"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Tickets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-siso-text">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Recent Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-siso-bg rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-siso-text">{ticket.id}</span>
                            <Badge variant="outline" className={cn("text-xs", getStatusColor(ticket.status))}>
                              {ticket.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-siso-text mb-1">{ticket.subject}</h4>
                          <div className="flex items-center gap-4 text-xs text-siso-text-muted">
                            <span>{ticket.lastUpdate}</span>
                            <span>by {ticket.agent}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Knowledge Base */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="bg-siso-bg-secondary border-siso-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-siso-text">
                <HelpCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {knowledgeBase.map((section, index) => (
                  <motion.div
                    key={section.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <h3 className="font-semibold text-siso-text">{section.category}</h3>
                    <div className="space-y-2">
                      {section.articles.map((article, articleIndex) => (
                        <Button
                          key={articleIndex}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto p-2 text-siso-text-muted hover:text-siso-orange hover:bg-siso-orange/10"
                        >
                          <FileText className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="text-sm">{article}</span>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ClientDashboardLayout>
  );
}
