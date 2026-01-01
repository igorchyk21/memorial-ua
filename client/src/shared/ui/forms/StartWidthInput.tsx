import React, { RefObject } from "react";
import { FormControl } from "react-bootstrap";

interface Props {
  id?: string;
  name?: string;
  disabled?: boolean;
  startWith: string; // "@", "https://", "tel:+", тощо
  onlyNumber?: boolean; // дозволяє вводити тільки цифри (і + на початку)
  refInput?: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
}

const StartWidthInput = ({
  id,
  name,
  disabled,
  startWith,
  onlyNumber,
  refInput,
  value,
  onChange,
}: Props) => {
  // та ж сама логіка, що й у твоїй Formik-версії
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value ?? "";

    // 0) фільтр символів
    if (onlyNumber) {
      // залишаємо цифри і плюс тільки на початку
      v = v.replace(/(?!^)\+/g, ""); // всі "+" крім першого забираємо
      v = v.replace(/[^0-9+]/g, ""); // дозволяємо лише цифри та +
    } else {
      // дозволяємо стандартні URL-символи, включно з ?, =, &
      v = v.replace(/[^a-zA-Z0-9._\-:/?=&]/g, "");
    }

    // 1) якщо значення є частиною префікса — лишаємо
    if (startWith.startsWith(v) || v.startsWith(startWith)) {
      const reMany = new RegExp(`^(?:${esc(startWith)})+`);
      const normalized = v.replace(reMany, startWith);
      onChange(normalized);
      return;
    }

    // 2) якщо значення порожнє
    if (v === "") {
      onChange("");
      return;
    }

    // 3) додаємо рівно один префікс
    onChange(startWith + v);
  };

  return (
    <FormControl
      ref={refInput}
      disabled={disabled}
       
      type="text"
      className="form-control"
      value={value ?? ""}
      placeholder={startWith}
      onChange={handleChange}
    />
  );
};

export default StartWidthInput;
