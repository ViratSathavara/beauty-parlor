'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [email, setEmail] = useState('admin@elegancebeauty.in');
  const [password, setPassword] = useState('AdminPassword123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = async () => {
    setEmail('admin@elegancebeauty.in');
    setPassword('AdminPassword123!');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@elegancebeauty.in',
          password: 'AdminPassword123!',
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setError(err.message || 'Quick login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-stone-950/80 backdrop-blur-md border border-amber-900/30 p-8 rounded-lg shadow-2xl space-y-6">
      {/* Header Logo */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-full bg-gold/10 text-gold mb-2">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl font-normal tracking-wide text-stone-100">
          ELEGANCE <span className="text-gold text-xs uppercase tracking-widest block font-sans font-semibold">Admin & Staff Portal</span>
        </h1>
        <p className="text-xs text-stone-400 font-light">
          Sign in to access your business operations dashboard
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/60 border border-rose-800/50 rounded text-rose-300 text-xs font-light">
          {error}
        </div>
      )}

      {/* Development Quick Credentials Banner */}
      <div className="bg-amber-950/40 border border-amber-800/40 p-4 rounded text-xs space-y-2">
        <div className="flex items-center space-x-2 text-gold font-semibold uppercase tracking-wider text-[11px]">
          <ShieldCheck className="w-4 h-4" />
          <span>Development Admin Credentials</span>
        </div>
        <p className="text-stone-300 text-[11px] font-mono">Email: admin@elegancebeauty.in</p>
        <p className="text-stone-300 text-[11px] font-mono">Password: AdminPassword123!</p>
        <button
          type="button"
          onClick={handleQuickAdminLogin}
          disabled={loading}
          className="w-full mt-2 py-2 px-3 bg-gold text-charcoal font-semibold rounded text-xs hover:bg-gold-light transition-all flex items-center justify-center space-x-1"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>One-Click Quick Admin Login</span>
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded text-xs text-stone-200 focus:outline-none focus:border-gold transition-colors"
              placeholder="admin@elegancebeauty.in"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded text-xs text-stone-200 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-stone-100 font-medium rounded text-xs transition-colors flex items-center justify-center space-x-2"
        >
          <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2">
        <Link href="/" className="text-stone-400 hover:text-gold text-xs transition-colors">
          ← Return to Salon Homepage
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone-900 text-canvas flex flex-col justify-center items-center px-4 py-12">
      <Suspense fallback={<div className="text-gold text-xs">Loading login portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
