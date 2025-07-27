import Image from "next/image";

function ProfileImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div>
      <Image src={src} alt={alt} width={700} height={700} />
    </div>
  );
}

export default ProfileImage;
