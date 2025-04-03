const SvgIcon = ({ name, size = 16, className = "" }) => {
  return (
    <svg className={className} width={size} height={size} aria-hidden="true">
      <use href={`/src/assets/icons/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
