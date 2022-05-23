const PrimaryButton = ({text,witdh}) => {
    
    return(
        <button className={`bg-black text-white rounded-md p-4 text-base my-3 ${witdh}`} >{text}</button>
    );
}

export default PrimaryButton;