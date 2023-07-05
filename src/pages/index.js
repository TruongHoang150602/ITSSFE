import { useRouter } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';
const Page = () => {

  const router = useRouter();
  const auth = useAuth();
  if(auth.isAuthenticated)
        {    
          const {user} = auth;
          if(user.role === "admin")
            router.push('/dashboard/admin');
          else if(user.role === "sale" || user.role === "caring" || user.role === "coach")
            router.push('/dashboard/employee');
          else 
            router.push('/dashboard/user');
        }
  else router.push('auth/login')
  
}

export default Page;