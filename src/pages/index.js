import { useRouter } from 'next/navigation';
const Page = () => {

  const router = useRouter();
  router.push('auth/login')
  
}

export default Page;