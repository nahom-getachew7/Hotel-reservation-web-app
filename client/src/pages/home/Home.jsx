import React from "react";
import Featured from "../../components/featured/Featured.jsx";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
// import bgimage from "../../assets/images/pexels-freemockupsorg-775219.jpg";
const Home = () => {
  return (
    <div
      className=" bg-slate-600 h-96 w-full relative"
      // style={`background-image: url('../../assets/images/pexels-freemockupsorg-775219.jpg'); height: 400px`}
    >
      <img
        src="https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />

      <div className="">
        <Navbar />
      </div>
      <div className="pt-36">
        <Header />
      </div>
      <div className=" bg-slate-100 mx-auto flex flex-col pb-4 justify-between items-center ">
        <h1 className="text-3xl font-semibold mt-8 mb-4 text-cyan-500">
          Most Visited Palces
        </h1>
        <Featured />
        <h1 className="text-3xl font-semibold mt-8 mb-4 text-cyan-500">
          Browse by property type
        </h1>
        <PropertyList />
        <h1 className="text-3xl font-semibold mt-8 mb-4">Homes guests love</h1>
        <FeaturedProperties />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
