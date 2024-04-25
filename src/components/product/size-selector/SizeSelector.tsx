import { ProductSize } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  selectedSize?: ProductSize;
  availableSizes: ProductSize[];
  onSizeChanged: (size: ProductSize) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Size</h3>

      <div className='flex gap-2'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx('hover:underline texlg font-semibold', {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
