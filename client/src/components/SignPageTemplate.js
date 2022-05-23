import image from "../assets/images/small-team-discussing-ideas.png";


const SingPageTemplate = (props) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center ">
      <div className="lg:ml-28">
          {props.children}
      </div>
      <div className="self-center">
        <img src={image} alt="small-team-discussing-ideas"/>
      </div>
    </div>
  );
};

export default SingPageTemplate;
