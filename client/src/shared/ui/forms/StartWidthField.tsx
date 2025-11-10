import { Field, FieldProps, getIn } from "formik";
import { RefObject, useRef } from "react";

interface Props {
  name: string;
  disabled?: boolean;
  startWith: string;
  onlyNumber?: boolean;
  refInput?: RefObject<HTMLInputElement | null>;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  showError?: boolean;
}

const StartWidthField = ({
  name,
  disabled,
  startWith,
  onlyNumber,
  refInput,
  minLength,
  maxLength,
  required,
  showError = true,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const finalRef = refInput || inputRef;

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const value = field.value ?? "";
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);

        const hasRequiredError = required && touch && !value;
        const hasMinLengthError = minLength && touch && value && value.length < minLength;
        const hasMaxLengthError = maxLength && touch && value && value.length > maxLength;
        const isInvalid = hasRequiredError || hasMinLengthError || hasMaxLengthError || !!error;

        const normalizeValue = (raw: string, oldValue: string): string => {
          let v = raw ?? "";

          // 1. Фільтрація
          if (onlyNumber) {
            if (v.startsWith("+")) {
              v = "+" + v.slice(1).replace(/[^0-9]/g, "");
            } else {
              v = v.replace(/[^0-9]/g, "");
            }
          } else {
            v = v.replace(/[^a-zA-Z0-9._\-:/+@]/g, "");
          }

          if (v === "") return "";

          // 2. Якщо вже є повний префікс — залишити
          if (v.startsWith(startWith)) return v;

          // 3. Якщо користувач вводить префікс вручну — дозволити
          if (startWith.startsWith(v)) return v;

          // 4. КРИТИЧНИЙ ВИПАДОК: часткове видалення префікса
          // Наприклад: https://site → видалити 's' → http://site
          // Але ми знаємо, що oldValue був з повним префіксом
          if (oldValue.startsWith(startWith)) {
            const contentAfterPrefix = oldValue.slice(startWith.length);
            // Якщо контент після префікса не порожній — відновлюємо префікс
            if (contentAfterPrefix && v.includes(contentAfterPrefix)) {
              return startWith + contentAfterPrefix;
            }
          }

          // 5. Інакше — додаємо префікс
          return startWith + v;
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target;
          const cursorPos = input.selectionStart || 0;
          const oldValue = field.value ?? "";
          const rawValue = e.target.value;

          let normalized = normalizeValue(rawValue, oldValue);

          // Обмеження maxLength
          if (maxLength && normalized.length > maxLength) {
            const content = normalized.slice(startWith.length);
            const allowed = content.slice(0, maxLength - startWith.length);
            normalized = startWith + allowed;
          }

          form.setFieldValue(field.name, normalized);

          // Корекція курсора
          if (finalRef.current && cursorPos !== null) {
            setTimeout(() => {
              if (!finalRef.current) return;

              let newPos = cursorPos;

              // Якщо додали префікс
              if (!oldValue.startsWith(startWith) && normalized.startsWith(startWith)) {
                newPos += startWith.length;
              }

              // Якщо видалили частину префікса, але контент залишився
              if (rawValue.length < oldValue.length && cursorPos <= startWith.length && normalized.length > startWith.length) {
                newPos = startWith.length;
              }

              // Обмеження
              newPos = Math.max(startWith.length, Math.min(newPos, normalized.length));

              finalRef.current.setSelectionRange(newPos, newPos);
            }, 0);
          }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          field.onBlur(e);
          const v = field.value ?? "";

          if (required && !v) {
            form.setFieldError(field.name, "Це поле обов'язкове");
          } else if (minLength && v && v.length < minLength) {
            form.setFieldError(field.name, `Мінімум ${minLength} символів`);
          } else if (maxLength && v && v.length > maxLength) {
            form.setFieldError(field.name, `Максимум ${maxLength} символів`);
          }
        };

        return (
          <div className="position-relative">
            <input
              ref={finalRef}
              disabled={disabled || form.isSubmitting}
              id={name}
              type="text"
              className={`form-control ${isInvalid ? "is-invalid" : ""}`}
              value={value}
              placeholder={startWith}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              maxLength={maxLength}
              minLength={minLength}
              
            />

            {showError && isInvalid && (
              <div className="invalid-feedback mt-0">
                {hasRequiredError
                  ? "Це поле обов'язкове"
                  : hasMinLengthError
                  ? `Мінімум ${minLength} символів (зараз ${value.length})`
                  : hasMaxLengthError
                  ? `Максимум ${maxLength} символів (зараз ${value.length})`
                  : error}
              </div>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default StartWidthField;