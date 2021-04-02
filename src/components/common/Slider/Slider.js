import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../common/Button/Button';

import styles from './Slider.module.scss';

const Slider = ({
  children,
  className: propClassName,
  noButtons,
  autoPlay,
  interval,
  noDots,
}) => {
  const classes = [styles.root];
  if (propClassName) classes.push(propClassName);

  const sliderCount = React.Children.count(children);
  const sliderStep = 1;

  /* State */
  const [isSlideFading, setSlideFading] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  /* Dots functionality */
  const handleSlideChange = newIndex => {
    setSlideFading(true);
    setTimeout(() => {
      setActiveSlideIndex(newIndex);
    }, 300);
    setTimeout(() => {
      setSlideFading(false);
    }, 500);
  };

  const handleSliderForward = event => {
    event.preventDefault();
    if (activeSlideIndex + 1 < sliderCount) {
      handleSlideChange(activeSlideIndex + sliderStep);
    }
  };

  const handleSliderBackward = event => {
    event.preventDefault();
    if (activeSlideIndex - 1 >= 0) {
      handleSlideChange(activeSlideIndex - sliderStep);
    }
  };

  const dots = noDots ? null : (
    <div className={styles.dots}>
      {[...Array(sliderCount).keys()].map(key => (
        <div key={key} className={styles.dot}></div>
      ))}
    </div>
  );

  const buttons = noButtons ? null : (
    <div className={styles.buttons}>
      <Button className={styles.button} onClick={event => handleSliderBackward(event)}>
        <span>&lt;</span>
      </Button>
      <Button className={styles.button} onClick={event => handleSliderForward(event)}>
        <span>&gt;</span>
      </Button>
    </div>
  );

  return (
    <div className={classes.join(' ')}>
      {dots}
      <div className={styles.slider}>
        {React.Children.map(
          children,
          (child, i) =>
            i === activeSlideIndex && (
              <div
                key={i}
                className={
                  styles.slide +
                  (isSlideFading ? ` ${styles.fadeout}` : ` ${styles.fadein}`)
                }
              >
                {child}
              </div>
            )
        )}
      </div>
      {buttons}
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  noButtons: PropTypes.bool,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  noDots: PropTypes.bool,
};

export default Slider;
