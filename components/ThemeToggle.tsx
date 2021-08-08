import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import nightwind from 'nightwind/helper';

interface Props {
  checked: boolean;
}

const ThemeToggle = ({ checked }: Props) => (
  <button
    className="absolute top-4 right-4 print:hidden"
    title={`Switch to ${checked ? 'light' : 'dark'} mode`}
    onClick={() => nightwind.toggle()}
  >
    {checked ? <SunIcon className="w-4" /> : <MoonIcon className="w-4" />}
  </button>
);

export default ThemeToggle;
