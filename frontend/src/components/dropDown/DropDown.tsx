import "./dropDown.scss";

interface DropDownProps {
  items: { label: string; icon: JSX.Element }[];
}

const DropDown = ({ items }: DropDownProps) => {
  return (
    <div className="dropDown">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
