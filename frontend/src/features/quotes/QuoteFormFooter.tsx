import { ChangeEvent, useRef } from "react";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";

export default function QuoteFormFooter(props: {
  onChangeDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeTermsAndCondtion: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  description: string;
  termsAndCondtions: string;
}) {
  const termsAndCondtionsRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(termsAndCondtionsRef.current, props.termsAndCondtions);
  useAutosizeTextArea(descriptionRef.current, props.description);
  return (
    <tr className="border-2 border-emerald-500 p-1">
      <td colSpan={2} className="border-r-2 border-emerald-500">
        <textarea
          value={props.termsAndCondtions}
          onChange={props.onChangeTermsAndCondtion}
          ref={termsAndCondtionsRef}
          placeholder="Terms And Condtions"
          name="termsAndCondtions"
          id="termsAndCondtions"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-white placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-s p-1"
        />
      </td>
      <td className="border-2 border-emerald-500" colSpan={6}>
        <textarea
          value={props.description}
          onChange={props.onChangeDescription}
          ref={descriptionRef}
          placeholder="Description"
          name="description"
          id="description"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-white placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-s p-1"
        />
      </td>
    </tr>
  );
}
