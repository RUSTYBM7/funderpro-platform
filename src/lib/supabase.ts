import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jpxcutjfjeaerbrgjnav.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9vErrdHqpg3nXQj5JdYklw_RDG9rpnd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile helpers
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Record<string, unknown>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// Wallet helpers
export const getWallets = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const getWallet = async (userId: string, currency: string = 'USD') => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .eq('currency', currency)
    .single();
  return { data, error };
};

export const createTransaction = async (transaction: {
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'transfer';
  amount: number;
  currency: string;
  asset?: string;
  fee?: number;
  reference?: string;
  metadata?: Record<string, unknown>;
}) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...transaction, status: 'pending' }])
    .select()
    .single();
  return { data, error };
};

// Chat helpers
export const subscribeToChat = (userId: string, callback: (message: unknown) => void) => {
  return supabase
    .channel('chat_messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => callback(payload.new)
    )
    .subscribe();
};

export const sendChatMessage = async (userId: string, content: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([{ user_id: userId, content, sender_type: 'user' }])
    .select()
    .single();
  return { data, error };
};

export const getChatMessages = async (userId: string, limit: number = 50) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
    .limit(limit);
  return { data, error };
};

// Trading account helpers
export const getTradingAccounts = async (userId: string) => {
  const { data, error } = await supabase
    .from('trading_accounts')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

// Notification helpers
export const getNotifications = async (userId: string, unreadOnly: boolean = false) => {
  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (unreadOnly) {
    query = query.eq('read', false);
  }

  const { data, error } = await query;
  return { data, error };
};

export const markNotificationRead = async (notificationId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
  return { error };
};

// Type definitions for database
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          country: string | null;
          kyc_status: 'pending' | 'verified' | 'rejected';
          kyc_verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          currency: string;
          balance: number;
          locked_balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['wallets']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['wallets']['Insert']>;
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'transfer';
          status: 'pending' | 'completed' | 'failed' | 'cancelled';
          amount: number;
          currency: string;
          asset: string | null;
          fee: number;
          reference: string | null;
          metadata: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          sender_type: 'user' | 'support';
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>;
      };
      referrals: {
        Row: {
          id: string;
          referrer_id: string;
          referred_id: string;
          reward_amount: number;
          status: 'pending' | 'completed';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['referrals']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['referrals']['Insert']>;
      };
      trading_accounts: {
        Row: {
          id: string;
          user_id: string;
          account_type: string;
          balance: number;
          equity: number;
          profit: number;
          status: 'active' | 'paused' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['trading_accounts']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['trading_accounts']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'info' | 'warning' | 'success' | 'error';
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
  };
};

export default supabase;