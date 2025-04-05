import { TailSpin } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div className=" flex items-center justify-center">
      <TailSpin
        height="100"
        width="100"
        color="#218838"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={true}
      />
    </div>
  );
};

export default LoadingPage;
