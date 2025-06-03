import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
  // Note: redirect() must be called before any JSX is returned.
  // For clarity, one might return null or a loading spinner if needed,
  // but in this case, the redirect is immediate.
  return null;
}