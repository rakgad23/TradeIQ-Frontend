import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { 
  Settings as SettingsIcon,
  ShoppingCart,
  Key,
  Users,
  Bell,
  Eye,
  EyeOff,
  ExternalLink,
  Trash2,
  Edit,
  RotateCcw,
  UserPlus,
  Crown,
  Shield,
  BarChart,
  Monitor,
  Moon,
  Sun,
  Upload,
  CreditCard,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  ChevronDown,
  Mail,
  Smartphone,
  MessageSquare,
  Clock,
  Calendar,
  AlertOctagon
} from "lucide-react";

type SettingsSection = 'amazon' | 'keepa' | 'team' | 'account';

interface SettingsSectionItem {
  id: SettingsSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface SettingsProps {
  onUpgrade: () => void;
}

export function Settings({ onUpgrade }: SettingsProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('amazon');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'not-connected' | 'error'>('connected');
  const [keepaStatus, setKeepaStatus] = useState<'active' | 'inactive'>('active');
  const [showApiKey, setShowApiKey] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      frequency: 'immediate',
      priceAlerts: true,
      rankChanges: true,
      competitorAlerts: true,
      aiInsights: true
    },
    push: {
      enabled: true,
      frequency: 'immediate',
      priceAlerts: true,
      rankChanges: true
    },
    slack: {
      enabled: false
    },
    advanced: {
      quietHours: false,
      weekendNotifications: true,
      urgentAlerts: true
    }
  });

  const settingsSections: SettingsSectionItem[] = [
    {
      id: 'amazon',
      label: 'Amazon Seller Central',
      icon: ShoppingCart,
      description: 'Connect your Amazon account'
    },
    {
      id: 'keepa',
      label: 'Keepa API',
      icon: Key,
      description: 'Manage API integrations'
    },
    {
      id: 'team',
      label: 'Team & Permissions',
      icon: Users,
      description: 'Manage team access'
    },
    {
      id: 'account',
      label: 'Account & Notifications',
      icon: Bell,
      description: 'Account settings'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Manager", 
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e740?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      role: "Analyst",
      status: "pending",
      avatar: ""
    }
  ];

  const rolePermissions = [
    {
      role: "Owner",
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
      permissions: ["Full system access", "Billing management", "Team management", "Data export"]
    },
    {
      role: "Manager", 
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      permissions: ["Analytics access", "Automation setup", "Report generation", "Team oversight"]
    },
    {
      role: "Analyst",
      color: "bg-gradient-to-r from-green-500 to-emerald-600", 
      permissions: ["View analytics", "Generate reports", "Monitor performance", "Basic insights"]
    },
    {
      role: "Viewer",
      color: "bg-gradient-to-r from-gray-500 to-gray-600",
      permissions: ["View dashboards", "Basic metrics", "Read-only access", "Export data"]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'not-connected':
      case 'inactive':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'not-connected':
      case 'inactive':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Analyst':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Viewer':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderAmazonSection = () => (
    <motion.div
      key="amazon"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Connection Status Banner */}
      <div className={`p-6 rounded-2xl border-2 ${getStatusColor(connectionStatus)} backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getStatusIcon(connectionStatus)}
            <div>
              <h3 className="font-bold text-lg">
                {connectionStatus === 'connected' ? 'Connected to Amazon Seller Central' : 
                 connectionStatus === 'error' ? 'Connection Error' : 'Not Connected'}
              </h3>
              <p className="text-sm mt-1 opacity-80">
                {connectionStatus === 'connected' ? 'Data syncing successfully' :
                 connectionStatus === 'error' ? 'Please check your credentials' : 'Connect your account to start syncing data'}
              </p>
            </div>
          </div>
          {connectionStatus === 'connected' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
              Last sync: 2 mins ago
            </Badge>
          )}
        </div>
      </div>

      {/* Connection Form */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-gray-900">Connection Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="marketplace" className="text-sm font-semibold text-gray-700">Marketplace</Label>
              <Select defaultValue="us">
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States (amazon.com)</SelectItem>
                  <SelectItem value="uk">United Kingdom (amazon.co.uk)</SelectItem>
                  <SelectItem value="ca">Canada (amazon.ca)</SelectItem>
                  <SelectItem value="de">Germany (amazon.de)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="client-id" className="text-sm font-semibold text-gray-700">Client ID</Label>
              <Input 
                id="client-id" 
                placeholder="Enter your Client ID"
                className="h-12 rounded-xl border-gray-200 bg-white"
                defaultValue={connectionStatus === 'connected' ? 'amzn1.application-oa2-client.xxxxxxxxxxxxx' : ''}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="client-secret" className="text-sm font-semibold text-gray-700">Client Secret</Label>
              <Input 
                id="client-secret" 
                type="password"
                placeholder="Enter your Client Secret"
                className="h-12 rounded-xl border-gray-200 bg-white"
                defaultValue={connectionStatus === 'connected' ? 'xxxxxxxxxxxxxxxxxxxxxxxx' : ''}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="refresh-token" className="text-sm font-semibold text-gray-700">Refresh Token</Label>
              <Input 
                id="refresh-token" 
                type="password"
                placeholder="Enter your Refresh Token"
                className="h-12 rounded-xl border-gray-200 bg-white"
                defaultValue={connectionStatus === 'connected' ? 'Atzr|IwEBIA_xxxxxxxxxxxxxxxxx' : ''}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setConnectionStatus(connectionStatus === 'connected' ? 'not-connected' : 'connected')}
            >
              {connectionStatus === 'connected' ? 'Reconnect Account' : 'Connect Account'}
            </Button>
            {connectionStatus === 'connected' && (
              <Button variant="outline" size="lg" className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl px-8">
                Disconnect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderKeepaSection = () => (
    <motion.div
      key="keepa"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* API Status Banner */}
      <div className={`p-6 rounded-2xl border-2 ${getStatusColor(keepaStatus)} backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getStatusIcon(keepaStatus)}
            <div>
              <h3 className="font-bold text-lg">
                Keepa API {keepaStatus === 'active' ? 'Active' : 'Inactive'}
              </h3>
              <p className="text-sm mt-1 opacity-80">
                {keepaStatus === 'active' ? 'API key is valid and working' : 'No API key configured'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-gray-900">API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="api-key" className="text-sm font-semibold text-gray-700">API Key</Label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input 
                  id="api-key" 
                  type={showApiKey ? "text" : "password"}
                  placeholder="Enter your Keepa API key"
                  className="h-12 rounded-xl border-gray-200 bg-white pr-12"
                  defaultValue={keepaStatus === 'active' ? 'kp-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz' : ''}
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-gray-200"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Usage Stats */}
          {keepaStatus === 'active' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200/50">
                <div className="text-3xl font-bold text-blue-900 mb-2">1,247</div>
                <div className="text-sm text-blue-700 mb-3 font-medium">API Calls Today</div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50">
                <div className="text-3xl font-bold text-gray-900 mb-2">2,000</div>
                <div className="text-sm text-gray-700 mb-3 font-medium">Daily Limit</div>
                <div className="mt-2">
                  <Progress value={62} className="h-2" />
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200/50">
                <div className="text-3xl font-bold text-green-900 mb-2">62%</div>
                <div className="text-sm text-green-700 mb-3 font-medium">Usage Today</div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setKeepaStatus(keepaStatus === 'active' ? 'inactive' : 'active')}
            >
              {keepaStatus === 'active' ? 'Update API Key' : 'Add API Key'}
            </Button>
            <Button variant="outline" size="lg" className="gap-3 rounded-xl px-8 border-gray-200">
              <ExternalLink className="w-4 h-4" />
              View Keepa Dashboard
            </Button>
            {keepaStatus === 'active' && (
              <Button variant="outline" size="lg" className="text-red-600 border-red-200 hover:bg-red-50 gap-3 rounded-xl px-8">
                <Trash2 className="w-4 h-4" />
                Remove Key
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderTeamSection = () => (
    <motion.div
      key="team"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Team Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
        <div>
          <h3 className="font-bold text-xl text-gray-900">Team Management</h3>
          <p className="text-gray-600 mt-1">Manage your team members and their permissions</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-3 rounded-xl px-8 shadow-lg">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </Button>
      </div>

      {/* Team Members */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-gray-900">Team Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 ring-2 ring-gray-200 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge className={`${getRoleColor(member.role)} px-3 py-1`}>
                  {member.role === 'Owner' && <Crown className="w-3 h-3 mr-1" />}
                  {member.role === 'Manager' && <Shield className="w-3 h-3 mr-1" />}
                  {member.role === 'Analyst' && <BarChart className="w-3 h-3 mr-1" />}
                  {member.role === 'Viewer' && <Monitor className="w-3 h-3 mr-1" />}
                  {member.role}
                </Badge>
                
                <Badge variant={member.status === 'active' ? 'default' : 'secondary'} className="px-3 py-1">
                  {member.status}
                </Badge>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  {member.role !== 'Owner' && (
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-red-500 hover:text-red-600 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-gray-900">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rolePermissions.map((role) => (
              <div key={role.role} className="p-6 bg-white rounded-2xl border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${role.color} flex items-center justify-center shadow-lg`}>
                    {role.role === 'Owner' && <Crown className="w-5 h-5 text-white" />}
                    {role.role === 'Manager' && <Shield className="w-5 h-5 text-white" />}
                    {role.role === 'Analyst' && <BarChart className="w-5 h-5 text-white" />}
                    {role.role === 'Viewer' && <Monitor className="w-5 h-5 text-white" />}
                  </div>
                  <h4 className="font-bold text-gray-900">{role.role}</h4>
                </div>
                <ul className="space-y-3">
                  {role.permissions.map((permission, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAccountSection = () => (
    <motion.div
      key="account"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* User Profile */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-gray-900">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <div className="flex items-center gap-6 mb-6">
              <div className="h-20 w-20 ring-4 ring-gray-200 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  JD
                </span>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="full-name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                    <Input id="full-name" defaultValue="John Doe" className="h-12 rounded-xl border-gray-200 bg-white" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" className="h-12 rounded-xl border-gray-200 bg-white" />
                  </div>
                </div>
              </div>
              <Button variant="outline" size="lg" className="gap-3 rounded-xl px-6 border-gray-200">
                <Upload className="w-4 h-4" />
                Upload Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plan */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border-blue-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900">Pro Trial Plan</h4>
                <p className="text-gray-600 mt-1">7 days remaining • $49/month after trial</p>
              </div>
            </div>
            <Button 
              onClick={onUpgrade}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 shadow-lg"
            >
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-xl font-bold text-gray-900">Notification Settings</CardTitle>
          </div>
          <p className="text-gray-600 mt-1">Configure how and when you receive notifications</p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Email Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
              </div>
              <Switch 
                checked={notifications.email.enabled}
                onCheckedChange={(checked) => setNotifications({
                  ...notifications, 
                  email: {...notifications.email, enabled: checked}
                })}
              />
            </div>
            
            {notifications.email.enabled && (
              <div className="ml-8 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">Frequency</Label>
                  <Select 
                    value={notifications.email.frequency}
                    onValueChange={(value) => setNotifications({
                      ...notifications,
                      email: {...notifications.email, frequency: value}
                    })}
                  >
                    <SelectTrigger className="w-48 border-gray-200 rounded-lg bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Notification Types</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Price Alerts</span>
                      <Switch 
                        checked={notifications.email.priceAlerts}
                        onCheckedChange={(checked) => setNotifications({
                          ...notifications,
                          email: {...notifications.email, priceAlerts: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Rank Changes</span>
                      <Switch 
                        checked={notifications.email.rankChanges}
                        onCheckedChange={(checked) => setNotifications({
                          ...notifications,
                          email: {...notifications.email, rankChanges: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Competitor Alerts</span>
                      <Switch 
                        checked={notifications.email.competitorAlerts}
                        onCheckedChange={(checked) => setNotifications({
                          ...notifications,
                          email: {...notifications.email, competitorAlerts: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">AI Insights</span>
                      <Switch 
                        checked={notifications.email.aiInsights}
                        onCheckedChange={(checked) => setNotifications({
                          ...notifications,
                          email: {...notifications.email, aiInsights: checked}
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Push Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications on your device</p>
                </div>
              </div>
              <Switch 
                checked={notifications.push.enabled}
                onCheckedChange={(checked) => setNotifications({
                  ...notifications, 
                  push: {...notifications.push, enabled: checked}
                })}
              />
            </div>
            
            {notifications.push.enabled && (
              <div className="ml-8 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">Frequency</Label>
                  <Select 
                    value={notifications.push.frequency}
                    onValueChange={(value) => setNotifications({
                      ...notifications,
                      push: {...notifications.push, frequency: value}
                    })}
                  >
                    <SelectTrigger className="w-48 border-gray-200 rounded-lg bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Notification Types</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Price Alerts</span>
                      <Switch 
                        checked={notifications.push.priceAlerts}
                        onCheckedChange={(checked) => setNotifications({
                          ...notifications,
                          push: {...notifications.push, priceAlerts: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Rank Changes</span>
                      <Switch 
                        checked={notifications.push.rankChanges}
                        onCheckedChange={(checked) => setNotifications({
                          ...notifications,
                          push: {...notifications.push, rankChanges: checked}
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Slack Integration */}
          <div className="space-y-4 opacity-60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-semibold text-gray-500">Slack Integration</h4>
                  <p className="text-sm text-gray-500">Send notifications to Slack channels</p>
                </div>
              </div>
              <Switch 
                disabled
                checked={notifications.slack.enabled}
              />
            </div>
          </div>

          <Separator />

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Advanced Settings</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Quiet Hours</p>
                    <p className="text-sm text-gray-600">Pause notifications during specific hours</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.advanced.quietHours}
                  onCheckedChange={(checked) => setNotifications({
                    ...notifications,
                    advanced: {...notifications.advanced, quietHours: checked}
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Weekend Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications on weekends</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.advanced.weekendNotifications}
                  onCheckedChange={(checked) => setNotifications({
                    ...notifications,
                    advanced: {...notifications.advanced, weekendNotifications: checked}
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertOctagon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Urgent Alerts</p>
                    <p className="text-sm text-gray-600">Always receive urgent notifications</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.advanced.urgentAlerts}
                  onCheckedChange={(checked) => setNotifications({
                    ...notifications,
                    advanced: {...notifications.advanced, urgentAlerts: checked}
                  })}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Save Button */}
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-gray-900">App Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-200">
            <div className="flex items-center gap-4">
              {darkMode ? <Moon className="w-6 h-6 text-gray-700" /> : <Sun className="w-6 h-6 text-gray-700" />}
              <div>
                <p className="font-semibold text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-600 mt-1">Switch between light and dark themes</p>
              </div>
            </div>
            <Switch 
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-8 shadow-lg">
          Save Changes
        </Button>
        <Button variant="outline" size="lg" className="rounded-xl px-8 border-gray-200">
          Reset to Defaults
        </Button>
      </div>
    </motion.div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'amazon':
        return renderAmazonSection();
      case 'keepa':
        return renderKeepaSection();
      case 'team':
        return renderTeamSection();
      case 'account':
        return renderAccountSection();
      default:
        return renderAmazonSection();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/30 border-b border-gray-200/50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                <p className="text-gray-600 mt-1 font-medium">Configure your TradeIQ Pro account and integrations</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: 1 hour ago
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <nav className="space-y-3">
                  {settingsSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-white shadow-lg border border-blue-200/50 text-blue-700'
                            : 'bg-white/60 hover:bg-white hover:shadow-md border border-gray-200/50 text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            activeSection === section.id 
                              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{section.label}</p>
                            <p className="text-xs opacity-75 truncate">{section.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {activeSection === 'amazon' && renderAmazonSection()}
                {activeSection === 'keepa' && renderKeepaSection()}
                {activeSection === 'team' && renderTeamSection()}
                {activeSection === 'account' && renderAccountSection()}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Add extra padding at bottom to ensure content isn't cut off */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
}