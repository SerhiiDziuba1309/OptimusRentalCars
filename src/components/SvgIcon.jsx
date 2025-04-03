const SvgIcon = ({ name, className = "", size = 16 }) => {
  return (
    <svg className={className} width={size} height={size}>
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
