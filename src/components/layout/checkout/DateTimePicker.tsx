interface DateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  dateError?: string;
  timeError?: string;
}

export function DateTimePicker({
  date, time, onDateChange, onTimeChange, dateError, timeError
}: DateTimePickerProps) {
  const inputClass = "w-full bg-transparent border border-neutral-800 px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:border-amber-400 outline-none transition-colors [color-scheme:dark]";

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className={inputClass}
        />
        {dateError && <p className="text-red-400 text-xs mt-1">{dateError}</p>}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
          Time
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className={inputClass}
        />
        {timeError && <p className="text-red-400 text-xs mt-1">{timeError}</p>}
      </div>
    </div>
  );
}