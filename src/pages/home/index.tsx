import BannerOne from '../../assets/banners/1.jpg';
import BannerTwo from '../../assets/banners/2.jpg';
import BannerThree from '../../assets/banners/3.jpg';
const HomePage = (): JSX.Element => {
  return (
    <div className="h-screen">
      <div className="flex h-3/4 flex-1 flex-col lg:flex-row">
        <div className="h-1/3 hover:cursor-pointer lg:h-full lg:w-3/4 lg:rounded-l-md">
          <img
            src={BannerOne}
            alt=""
            loading="eager"
            className="w-full object-cover object-center lg:h-full lg:rounded-l-md"
          />
        </div>
        <div className="flex h-2/3 flex-col hover:cursor-pointer lg:h-full lg:w-1/4 lg:rounded-r-md">
          <div className="h-1/2 rounded-r-md lg:w-full">
            <img
              src={BannerTwo}
              alt=""
              loading={'eager'}
              className="object-cover object-center lg:h-full lg:w-full lg:rounded-r-md"
            />
          </div>
          <div className="h-1/2 lg:w-full">
            <img
              src={BannerThree}
              alt=""
              loading="eager"
              className="h-full w-full object-cover object-center lg:rounded-r-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
