import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";

const SocialsWidget = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-t-2 border-primary py-4">
        <h2 className="text-primary text-base font-bold uppercase mb-3">
          Stay Connected
        </h2>

        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <SocialButton title="Facebook" />
          <SocialButton title="Instagram" />
          <SocialButton title="Youtube" />
          <SocialButton title="x" />
        </div>
      </div>

      <div className="py-7 px-4 bg-gray-100 text-center">
        <Link to={""}>
          <img
            src="src/assets/tournaments/about.jpeg"
            alt=""
            className="w-full h-72 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

type ButtonProps = {
  title: string;
};

const SocialButton = ({ title }: ButtonProps) => {
  return (
    <a href="http://" target="_blank" rel="noopener noreferrer">
      <button className="flex items-center justify-between w-full h-10 py-2 px-4 text-base font-semibold border">
        <FaFacebook /> {title}
      </button>
    </a>
  );
};

export default SocialsWidget;
