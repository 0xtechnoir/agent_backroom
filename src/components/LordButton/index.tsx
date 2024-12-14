interface ILordButton {
  text: string;
  theme?: string;
  onClick?: (value?: any) => void;
}
const LordButton = ({ text, theme, onClick }: ILordButton) => {
  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <button onClick={handleOnClick} className={`hover:opacity-70 lord-button ${theme ?? ""}`}>
      {text}
    </button>
  );
};

export default LordButton;
