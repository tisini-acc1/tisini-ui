import { Link } from "react-router-dom";

import CategoryHeader from "./CategoryHeader";

const CategoryColumn = () => {
  return (
    <div className="w-full">
      <CategoryHeader category="Rugby" />

      <div className="mb-5 w-full h-48 overflow-hidden relative">
        <img
          src="src/assets/img/footballer-min.jpg"
          alt=""
          className="w-full object-cover cursor-pointer hover:scale-110 transition"
        />

        <Link
          to={""}
          className="absolute h-[4.8rem] bottom-0 left-0 flex flex-col bg-black-lighter/40 pt-1"
        >
          <ul className="flex items-center gap-3 text-white text-xs font-semibold ml-4 hover:text-primary cursor-pointer">
            <li>John Doe</li>
            <li>26 September 2023</li>
          </ul>
          <h3 className="px-4 py-2 text-white text-xs font-semibold transition-all hover:text-primary cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius autem
            aut quo ad velit reiciendis asperiores nihil quam rerum nam, placeat
            mollitia dolorum, aperiam officia?
          </h3>
        </Link>
      </div>

      <div>
        <ArticleRow img="public/player.jpg" />
        <ArticleRow img="src/assets/tournaments/Partially removed BG.png" />
        <ArticleRow img="public/p2.jpg" />
        <ArticleRow img="src/assets/tournaments/faqs.jpg" />
      </div>
    </div>
  );
};

type GridProps = {
  img: string;
};

const ArticleRow = ({ img }: GridProps) => {
  return (
    <Link
      to={""}
      className="w-full flex items-center justify-between gap-5 mt-4 pt-4 border-t border-primary-lightest"
    >
      <div className="w-1/2">
        <img
          src={img}
          alt=""
          className="w-full h-24 object-cover hover:scale-110 transition"
        />
      </div>

      <div className="w-1/2 flex flex-col gap-3">
        <ul className="flex items-center gap-3 text-gray-400 text-xs font-semibold  hover:text-primary cursor-pointer">
          <li>John Doe</li>
          <li>26 September 2023</li>
        </ul>

        <h3 className="text-gray-600 text-xs font-semibold transition-all hover:text-primary cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius autem
          aut quo ad velit
        </h3>
      </div>
    </Link>
  );
};

export default CategoryColumn;
