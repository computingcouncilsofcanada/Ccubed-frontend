import Image from "next/image";

function TeamcardImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Image
      src={imageUrl}
      fill
      alt="team-image"
      className="rounded-2xl object-cover"
      quality={100}
    ></Image>
  );
}

export default TeamcardImage;
