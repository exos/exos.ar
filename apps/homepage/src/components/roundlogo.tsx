import Image from "next/image";

interface RoundLogoProps {
  width?: number;
  height?: number;
  scale?: number;
}

export function RoundLogo(props: RoundLogoProps) {
  const { width = 128, height = 128, scale = 1 } = props;

  return (
    <Image
      src="/exos-round-128.png"
      className="w-16 h-16 rounded-full"
      alt="Exos"
      width={width * scale}
      height={height * scale}
    />
  );
}
