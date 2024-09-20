import "./dropDown.scss";
import { Link } from "react-router-dom";

interface DropDownProps {
  items: { label: string; icon: JSX.Element; href?: string }[];
}

const DropDown = ({ items }: DropDownProps) => {
  const handleDropDownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="dropDown" onClick={handleDropDownClick}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link to={item.href}>
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <>
                {item.icon} {item.label}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
