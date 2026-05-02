import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/avatar3.png"
        alt="Logo ByteBank"
        width={44}
        height={44}
        className="object-contain"
        priority
      />
      <Image
        src="/images/logo.png"
        alt="ByteBank"
        width={100}
        height={24}
        className="object-contain"
        priority
      />
    </Link>
  );
}