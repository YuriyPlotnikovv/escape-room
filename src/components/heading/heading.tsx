type HeadingProps = {
  children: React.ReactNode;
  addClass?: string;
}

function Heading({children, addClass}: HeadingProps): JSX.Element {
  const className = addClass ? `page-content__title-wrapper ${addClass}` : 'page-content__title-wrapper';

  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default Heading;
