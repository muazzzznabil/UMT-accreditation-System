interface Props {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const SectionNavigation: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  // const [activeTab, setActiveTab] = useState(0);

  //chnage `button to tab (jQuery)

  return (
    <div className="flex space-x-4 justify-center my-10">
      <button
        onClick={() => {
          setActiveTab(1);
        }}
        className={`${activeTab === 1 ? "text-blue-500" : "text-gray-900"}`}
      >
        Maklumat Program
      </button>
      <p>-</p>
      <button
        onClick={() => {
          setActiveTab(2);
        }}
        className={`${activeTab === 2 ? "text-blue-500" : "text-gray-900"}`}
      >
        Kelulusan Mesyuarat JKPT
      </button>
      <p>-</p>
      <button
        onClick={() => {
          setActiveTab(3);
        }}
        className={`${activeTab === 3 ? "text-blue-500" : "text-gray-900"}`}
      >
        Kelulusan Mesyuarat JKA
      </button>
    </div>
  );
};

export default SectionNavigation;
