interface Props {
  dateTime: string;
}

const formatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export default function PostDate({ dateTime }: Props) {
  return (
    <time
      dateTime={dateTime}
      className="text-gray-500 dark:text-gray-400 text-xs inline-block"
    >
      {formatter.format(new Date(dateTime))}
    </time>
  );
}
