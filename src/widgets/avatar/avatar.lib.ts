type AvatarSize = "XS" | "S" | "M" | "L";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

export const sizeConfig = {
  XS: {
    width: 50,
    height: 50,
    className: "h-[50px] w-[50px]",
  },
  S: {
    width: 100,
    height: 100,
    className: "h-[100px] w-[100px]",
  },
  M: {
    width: 150,
    height: 150,
    className: "h-[150px] w-[150px]",
  },
  L: {
    width: 200,
    height: 200,
    className: "h-[200px] w-[200px]",
  },
};
