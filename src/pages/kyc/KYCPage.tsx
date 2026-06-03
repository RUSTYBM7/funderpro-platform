import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Modal } from '@/components/ui';
import { Shield, CheckCircle2, Clock, AlertCircle, Upload, FileText, Camera, Lock } from 'lucide-react';

const verificationLevels = [
  { level: 1, name: 'Basic', status: 'verified', progress: 100 },
  { level: 2, name: 'Standard', status: 'verified', progress: 100 },
  { level: 3, name: 'Advanced', status: 'pending', progress: 60 },
];

const documents = [
  { name: 'Government ID', required: true, status: 'verified', icon: FileText },
  { name: 'Proof of Address', required: true, status: 'verified', icon: FileText },
  { name: 'Selfie with ID', required: true, status: 'pending', icon: Camera },
  { name: 'Source of Funds', required: false, status: 'not_submitted', icon: Upload },
];

export default function KYCPage() {
  const [showUploadModal, setShowUploadModal] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">KYC Verification</h1>
          <p className="text-text-secondary mt-1">Verify your identity to unlock all features</p>
        </div>

        {/* Status Banner */}
        <Card className="bg-gradient-to-r from-accent-blue/20 to-accent-purple/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-blue rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-text-primary font-semibold">Standard Verification</p>
                  <p className="text-text-secondary text-sm">You can trade with up to $50,000</p>
                </div>
              </div>
              <Badge variant="warning" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Pending Review
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Verification Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {verificationLevels.map((level, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    level.status === 'verified'
                      ? 'border-accent-green bg-accent-green/5'
                      : level.status === 'pending'
                      ? 'border-accent-yellow bg-accent-yellow/5'
                      : 'border-bg-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-text-muted text-sm">Level {level.level}</span>
                    {level.status === 'verified' && (
                      <CheckCircle2 className="w-5 h-5 text-accent-green" />
                    )}
                  </div>
                  <p className="font-semibold text-text-primary mb-2">{level.name}</p>
                  <div className="w-full bg-bg-border rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        level.status === 'verified' ? 'bg-accent-green' : 'bg-accent-yellow'
                      }`}
                      style={{ width: `${level.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Required Documents</CardTitle>
              <Button
                variant="primary"
                icon={<Upload className="w-4 h-4" />}
                onClick={() => setShowUploadModal(true)}
              >
                Upload Document
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    doc.status === 'verified'
                      ? 'border-accent-green/30 bg-accent-green/5'
                      : doc.status === 'pending'
                      ? 'border-accent-yellow/30 bg-accent-yellow/5'
                      : 'border-bg-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        doc.status === 'verified' ? 'bg-accent-green/10' : 'bg-bg-tertiary'
                      }`}>
                        <doc.icon className={`w-5 h-5 ${
                          doc.status === 'verified' ? 'text-accent-green' : 'text-text-muted'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{doc.name}</p>
                        {doc.required && (
                          <p className="text-xs text-accent-red">Required</p>
                        )}
                      </div>
                    </div>
                    {doc.status === 'verified' && (
                      <Badge variant="success">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {doc.status === 'pending' && (
                      <Badge variant="warning">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {doc.status === 'not_submitted' && (
                      <Badge variant="default">Not Submitted</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-bg-secondary">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <p className="font-medium text-text-primary mb-2">Your data is secure</p>
                <p className="text-text-secondary text-sm">
                  All documents are encrypted and stored securely. We use industry-standard security measures to protect your personal information. Your data will never be shared with third parties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Modal */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload Document"
          size="md"
        >
          <div className="space-y-6">
            <div className="border-2 border-dashed border-bg-border rounded-lg p-8 text-center hover:border-accent-green/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-primary font-medium mb-2">Drag and drop files here</p>
              <p className="text-text-muted text-sm mb-4">or click to browse</p>
              <p className="text-text-muted text-xs">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" fullWidth onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button fullWidth>
                Upload
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}