import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageComponent.scss';

const ImageComponent = ({ 
  src, 
  alt, 
  width, 
  height, 
  caption, 
  lazyLoad, 
  placeholder, 
  onClick 
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="image-component" style={{ width: width, height: height }}>
      {!loaded && placeholder && (
        <div className="placeholder">{placeholder}</div>
      )}
      <img
        src={src}
        alt={alt}
        loading={lazyLoad ? 'lazy' : 'eager'}
        onLoad={handleImageLoad}
        className={`image ${loaded ? 'loaded' : ''}`}
        onClick={onClick}
        style={{ display: loaded ? 'block' : 'none' }}
      />
      {caption && <div className="caption">{caption}</div>}
    </div>
  );
};

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  caption: PropTypes.string,
  lazyLoad: PropTypes.bool,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
};

ImageComponent.defaultProps = {
  width: '100%',
  height: 'auto',
  lazyLoad: false,
  placeholder: 'Loading...',
  onClick: null,
};

export default ImageComponent;
