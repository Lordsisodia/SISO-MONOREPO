import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Download,
  Calendar,
  Calculator,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  TrendingUp,
  DollarSign,
  FileDown,
  FileCheck,
  User,
  Mail,
  Smartphone
} from 'lucide-react';
import { cn } from '@/domains/shared/utils/cn';
import {
  TaxManagement,
  TaxDocument,
  TaxSummary,
  TaxSettings,
  TaxDocumentType
} from '../types/enhanced-wallet.types';

interface TaxAutomationProps {
  tax: TaxManagement;
  onTaxUpdate: (updates: Partial<TaxManagement>) => void;
  onDocumentGenerate: (documentType: TaxDocumentType, year: number) => Promise<void>;
  onDocumentDownload: (documentId: string) => Promise<void>;
  className?: string;
}

const documentTypeLabels: Record<TaxDocumentType, string> = {
  '1099-NEC': 'Form 1099-NEC',
  '1099-K': 'Form 1099-K',
  'W8BEN': 'Form W-8BEN',
  'W9': 'Form W-9',
  'annual_summary': 'Annual Tax Summary',
  'quarterly_report': 'Quarterly Report',
  'deduction_schedule': 'Deduction Schedule',
  'tax_statement': 'Tax Statement'
};

const statusColors = {
  draft: 'text-amber-500 bg-amber-500/10',
  ready: 'text-emerald-500 bg-emerald-500/10',
  filed: 'text-blue-500 bg-blue-500/10',
  archived: 'text-slate-500 bg-slate-500/10'
};

const currentYear = new Date().getFullYear();
const availableYears = Array.from({ length: 3 }, (_, i) => currentYear - i);

export const TaxAutomation: React.FC<TaxAutomationProps> = ({
  tax,
  onTaxUpdate,
  onDocumentGenerate,
  onDocumentDownload,
  className
}) => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDocumentType, setSelectedDocumentType] = useState<TaxDocumentType>('1099-NEC');
  const [showSettings, setShowSettings] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingSettings, setEditingSettings] = useState(tax.settings);

  const handleGenerateDocument = async () => {
    setIsGenerating(true);
    try {
      await onDocumentGenerate(selectedDocumentType, selectedYear);
    } catch (error) {
      console.error('Failed to generate document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDocument = async (documentId: string) => {
    try {
      await onDocumentDownload(documentId);
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  const handleSettingsUpdate = () => {
    onTaxUpdate({
      settings: editingSettings
    });
    setShowSettings(false);
  };

  const calculateTaxProgress = () => {
    const totalDocuments = 8; // Approximate number of expected documents
    const readyDocuments = tax.documents.filter(doc => doc.status === 'ready' || doc.status === 'filed').length;
    return (readyDocuments / totalDocuments) * 100;
  };

  const getCurrentYearSummary = (): TaxSummary | undefined => {
    return tax.summaries.find(summary => summary.year === currentYear);
  };

  const getDocumentsByYear = (year: number) => {
    return tax.documents.filter(doc => doc.year === year);
  };

  const currentSummary = getCurrentYearSummary();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Tax Year Overview */}
      <Card className="p-6 bg-gradient-to-br from-siso-bg-secondary to-siso-bg-tertiary">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-siso-orange" />
            <h3 className="text-lg font-semibold text-siso-text-primary">Tax Year {currentYear}</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Tax Settings
          </Button>
        </div>

        {currentSummary && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-siso-text-muted">Total Earnings</span>
                <span className="text-lg font-semibold text-siso-text-primary">
                  ${currentSummary.totalEarnings.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-siso-text-muted">Total Deductions</span>
                <span className="text-lg font-semibold text-amber-500">
                  ${currentSummary.totalDeductions.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-siso-text-muted">Tax Withheld</span>
                <span className="text-lg font-semibold text-blue-500">
                  ${currentSummary.totalTaxWithheld.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-siso-text-muted">Taxable Income</span>
                <span className="text-lg font-semibold text-emerald-500">
                  ${currentSummary.taxableIncome.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-siso-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-siso-text-muted">Tax Preparation Progress</span>
            <span className="text-sm font-medium">{calculateTaxProgress().toFixed(0)}%</span>
          </div>
          <Progress value={calculateTaxProgress()} className="h-2" />
        </div>
      </Card>

      {/* Document Generator */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-siso-orange" />
          <h4 className="font-semibold text-siso-text-primary">Tax Document Generator</h4>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Document Type</Label>
            <Select value={selectedDocumentType} onValueChange={(value: TaxDocumentType) => setSelectedDocumentType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(documentTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tax Year</Label>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleGenerateDocument}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Generating Document...
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4 mr-2" />
              Generate {documentTypeLabels[selectedDocumentType]}
            </>
          )}
        </Button>
      </Card>

      {/* Available Documents */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileCheck className="h-5 w-5 text-siso-orange" />
          <h4 className="font-semibold text-siso-text-primary">Your Tax Documents</h4>
          <Badge variant="outline">
            {tax.documents.length} documents
          </Badge>
        </div>

        <div className="space-y-3">
          {availableYears.map((year) => {
            const yearDocuments = getDocumentsByYear(year);
            if (yearDocuments.length === 0) return null;

            return (
              <div key={year} className="space-y-2">
                <h5 className="text-sm font-semibold text-siso-text-primary">
                  Tax Year {year}
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {yearDocuments.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 rounded-lg border border-siso-border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-siso-orange" />
                        <div>
                          <div className="text-sm font-medium">
                            {documentTypeLabels[document.type]}
                          </div>
                          <div className="text-xs text-siso-text-muted">
                            Generated {document.generatedAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[document.status]}>
                          {document.status}
                        </Badge>
                        {document.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(document.id)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {tax.documents.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-siso-text-muted mx-auto mb-3" />
            <p className="text-siso-text-muted">No tax documents available</p>
            <p className="text-sm text-siso-text-muted/70 mt-1">
              Generate your first tax document using the form above
            </p>
          </div>
        )}
      </Card>

      {/* Tax Settings */}
      {showSettings && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Tax Settings</h4>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tax ID / SSN</Label>
                <Input
                  value={editingSettings.taxId}
                  onChange={(e) => setEditingSettings(prev => ({ ...prev, taxId: e.target.value }))}
                  placeholder="Enter your Tax ID"
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Form</Label>
                <Select
                  value={editingSettings.taxForm}
                  onValueChange={(value: 'W9' | 'W8BEN' | 'other') =>
                    setEditingSettings(prev => ({ ...prev, taxForm: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="W9">Form W-9 (US Persons)</SelectItem>
                    <SelectItem value="W8BEN">Form W-8BEN (Non-US Persons)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Withholding Rate (%)</Label>
              <Input
                type="number"
                value={editingSettings.withholdingRate}
                onChange={(e) => setEditingSettings(prev => ({
                  ...prev,
                  withholdingRate: Number(e.target.value)
                }))}
                min="0"
                max="100"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-File Documents</Label>
                <p className="text-xs text-siso-text-muted">
                  Automatically file documents when ready
                </p>
              </div>
              <Switch
                checked={editingSettings.autoFile}
                onCheckedChange={(checked) =>
                  setEditingSettings(prev => ({ ...prev, autoFile: checked }))
                }
              />
            </div>

            <div className="space-y-3">
              <Label>Notification Preferences</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-siso-text-muted">Email Notifications</span>
                  <Switch
                    checked={editingSettings.notifications.email}
                    onCheckedChange={(checked) =>
                      setEditingSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-siso-text-muted">SMS Notifications</span>
                  <Switch
                    checked={editingSettings.notifications.sms}
                    onCheckedChange={(checked) =>
                      setEditingSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, sms: checked }
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSettingsUpdate} className="w-full">
              Save Tax Settings
            </Button>
          </div>
        </Card>
      )}

      {/* Tax Timeline */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-5 w-5 text-siso-orange" />
          <h4 className="font-semibold text-siso-text-primary">Tax Timeline & Reminders</h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-siso-border">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">1099-NEC Available</div>
              <div className="text-xs text-siso-text-muted">January 31, {currentYear + 1}</div>
            </div>
            <Mail className="h-4 w-4 text-siso-text-muted" />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-siso-border">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">Tax Filing Deadline</div>
              <div className="text-xs text-siso-text-muted">April 15, {currentYear + 1}</div>
            </div>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-siso-border">
            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">Quarterly Tax Reminder</div>
              <div className="text-xs text-siso-text-muted">Q1 - April 15, {currentYear + 1}</div>
            </div>
            <Smartphone className="h-4 w-4 text-siso-text-muted" />
          </div>
        </div>
      </Card>
    </div>
  );
};