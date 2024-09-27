import { MdFlashOn } from "react-icons/md";

const FeaturedSection = () => {
  return (
    <section className="flex h-[70vh] mt-7 mx-7 mb-0 pb-7 gap-2">
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        <div className="relative flex-1 flex gap-2">
          <img
            src="public/player.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* <a
            href=""
            className="absolute top-5 left-5 flex items-center justify-center bg-black-lighter text-white font-medium py-1 px-2 transition-all hover:bg-primary cursor-pointer"
          >
            Featured
          </a> */}
          <a
            href=""
            className="absolute top-5 right-5 flex items-center justify-center bg-primary text-white font-medium py-1 px-2 transition-all hover:bg-black-lighter cursor-pointer"
          >
            <MdFlashOn className="" />
          </a>

          <div className="absolute bottom-0 left-0 flex flex-col bg-black-lighter/40 pt-1">
            <ul className="flex items-center gap-3 text-white text-sm font-semibold ml-4 hover:text-primary cursor-pointer">
              <li>John Doe</li>
              <li>26 September 2023</li>
            </ul>

            <h3 className="px-4 py-2 text-white text-base font-extrabold transition-all hover:text-primary cursor-pointer">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              autem aut quo ad velit reiciendis asperiores nihil quam rerum nam,
              placeat mollitia dolorum, aperiam officia?
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        <div className="relative flex-1 flex gap-2">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article img="src/assets/img/footballer-min.jpg" />
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article img="public/p2.jpg" />
          </div>
        </div>

        <div className="relative flex-1 flex gap-2">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article img="src/assets/tournaments/faqs.jpg" />
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <Article img="src/assets/tournaments/about.jpeg" />
          </div>
        </div>
      </div>
    </section>
  );
};

type ArticleProps = {
  img: string;
  // cat: boolean;
};

const Article = ({ img }: ArticleProps) => {
  return (
    <div className="relative flex-1 flex gap-2">
      <img src={img} alt="" />

      <div className="absolute bottom-0 left-0 flex flex-col bg-black-lighter/40 pt-1">
        <ul className="flex items-center gap-3 text-white text-xs font-semibold ml-4 hover:text-primary cursor-pointer">
          <li>John Doe</li>
          <li>26 September 2023</li>
        </ul>

        <h3 className="px-4 py-2 text-white text-xs font-extrabold transition-all hover:text-primary cursor-pointer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
      </div>
    </div>
  );
};

export default FeaturedSection;
