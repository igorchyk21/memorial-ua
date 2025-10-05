'use client'

import { useEffect, useRef, useState } from 'react'
 import type { InputChoice, ClassNames } from 'choices.js'
import 'choices.js/public/assets/styles/choices.css'
import { CommonComponentProps } from '@/types'
import { useLocale } from 'next-intl'

type BaseChoiceType = Omit<InputChoice, 'value'>

interface ChoiceWithValue extends BaseChoiceType {
  value: any
  choices?: never
}

interface ChoiceWithChoices extends BaseChoiceType {
  value?: never
  choices: InputChoice[]
}

type ChoiceType = ChoiceWithValue | ChoiceWithChoices

interface SelectBoxProps extends CommonComponentProps {
  type?: 'text' | 'single' | 'multiple'
  items?: InputChoice[]
  choices?: ChoiceType[]
  customTemplate?: boolean
  searchEnabled?: boolean
  searchPlaceholder?: string
  removeItemButton?: boolean
  shouldSort?: boolean
  inputClassName?: string
  inputId?: string
  name?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  loadingText?: string
  noResultsText?: string
  noChoicesText?: string
  addItemText?: string
  removeItemText?: string
  onChange?: (value: string | string[]) => void
  onAddItem?: (item: any) => void
  onRemoveItem?: (item: any) => void
}

const SelectBox = ({
  type = 'single',
  items,
  choices,
  customTemplate,
  searchEnabled,
  searchPlaceholder,
  removeItemButton,
  shouldSort,
  inputClassName,
  inputId,
  name,
  value,
  defaultValue,
  placeholder,
  required,
  disabled,
  loadingText,
  noResultsText,
  noChoicesText,
  addItemText,
  removeItemText,
  onChange,
  onAddItem,
  onRemoveItem,
  ...props
}: SelectBoxProps) => {
  const selectEl = useRef(null)
  const selectBoxRef = useRef<any>(null);
  const locale = useLocale();
  const [ isReady, setIsReady ] = useState(false);
  const optionsRef = useRef({
    items: items || [],
    choices: (choices || []).map((choice) => {
      if ('choices' in choice) {
        return {
          ...choice,
          choices: choice.choices,
        }
      } else {
        return {
          ...choice,
        }
      }
    }) as InputChoice[],
    allowHTML: true,
    placeholderValue: placeholder,
    searchEnabled: searchEnabled || false,
    searchPlaceholderValue: searchPlaceholder || 'Search...',
    removeItemButton: removeItemButton ?? true,
    editItems: true,
    shouldSort: shouldSort || false,
    shouldSortItems: shouldSort || false,
    itemSelectText: '',
    loadingText: loadingText || 'Loading...',
    noResultsText: noResultsText || 'No results found',
    noChoicesText: noChoicesText || 'No options to choose from',
    addItemText: addItemText
      ? (value: string) => `${addItemText} <b>"${value}"</b>`
      : (value: string) => `Press Enter to add <b>"${value}"</b>`,
    removeItemIconText: removeItemText ? () => `${removeItemText}` : () => `Remove item`,
    removeItemLabelText: removeItemText
      ? (value: string) => `${removeItemText}: ${value}`
      : (value: string) => `Remove item: ${value}`,
    classNames: {
      containerInner: inputClassName ? ['form-select', ...inputClassName.split(' ')] : 'form-select',
    } as ClassNames,
    ...(customTemplate && {
      callbackOnCreateTemplates: (template: (str: string) => HTMLElement) => {
        return {
          item: ({ classNames }: { classNames: ClassNames }, data: any): any => {
            return template(`
              <div class="${classNames.item} ${
                data.highlighted ? classNames.highlightedState : classNames.itemSelectable
              } ${
                data.placeholder ? classNames.placeholder : ''
              }" data-item data-id="${data.id}" data-value="${data.value}" ${
                data.active ? 'aria-selected="true"' : ''
              } ${data.disabled ? 'aria-disabled="true"' : ''} ${data.placeholder ? 'data-placeholder' : ''}>
                ${data.placeholder || !data.customProperties?.selected ? data.label : data.customProperties.selected}
                ${
                  removeItemButton === false
                    ? ''
                    : `<button type="button" class="choices__button" aria-label="Remove item" data-button></button>`
                }
              </div>
            `)
          },
          choice: ({ classNames }: { classNames: ClassNames }, data: any): any => {
            return template(`
              <div class="${classNames.item} ${classNames.itemChoice} ${
                data.disabled ? classNames.itemDisabled : classNames.itemSelectable
              } ${data.placeholder ? classNames.placeholder : ''}" data-choice ${
                data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'
              } data-id="${data.id}" data-value="${data.value}" ${
                data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
              }>
                <div>
                  ${data.label}
                  ${(() => {
                    let output = ''
                    if (data.customProperties) {
                      for (const key in data.customProperties) {
                        if (Object.prototype.hasOwnProperty.call(data.customProperties, key) && key !== 'selected') {
                          output += data.customProperties[key]
                        }
                      }
                    }
                    return output
                  })()}
                </div>
              </div>
            `)
          },
        }
      },
    }),
  })

  useEffect(() => {
    let selectBox: any
    ;(async () => {
      const Choices = (await import('choices.js')).default
      if (selectEl.current && !(selectEl.current as HTMLElement).classList.contains('choices__input')) {
        selectBox = new Choices(selectEl.current, optionsRef.current)

        selectBoxRef.current = selectBox

        if (onChange) {
          selectBox.passedElement.element.addEventListener('choice', (event: Event) => {
            const selectedValues = selectBox.getValue(true)
             
            onChange(selectedValues)
          })
        }

        if (onAddItem) {
          selectBox.passedElement.element.addEventListener('addItem', (event: any) => {
            onAddItem(event.detail)
          })
        }

        if (onRemoveItem) {
          selectBox.passedElement.element.addEventListener('removeItem', (event: any) => {
            onRemoveItem(event.detail)
          })
        }

        if (value !== undefined) {
          selectBox.setChoiceByValue(value)
        }

        setIsReady(true);
      }
    })()

    return () => {
      if (selectBox) {
        selectBox.destroy()
      }
    }
  }, [onChange, onAddItem, onRemoveItem])
 
  useEffect(() => {
    if (selectBoxRef.current && value !== undefined) {
      setTimeout(() => {
        if (selectBoxRef.current) {
           
          selectBoxRef.current.removeActiveItems();
          selectBoxRef.current.setChoiceByValue(value)
        }
      }, 0)
    }
  }, [value])
 
  useEffect(() => {
    if ((selectBoxRef.current) && choices && isReady) {
      setTimeout(() => {
        selectBoxRef.current.removeActiveItems();
        selectBoxRef.current.clearChoices();
        selectBoxRef.current.setChoices(choices, 'value', 'label', true);
        if (value !== undefined) {
          selectBoxRef.current.setChoiceByValue(value);  
        }  
        
      }, 0);
      
    }      
  }, [choices, isReady, value]);

  useEffect(() => {
    const inst = selectBoxRef.current;
    if (!inst) return;

    if (disabled) inst.disable();
    else inst.enable();
  }, [disabled]);

  return (
    <>
      {type === 'text' ? (
        <div {...props}>
          <input
            type="text"
            ref={selectEl}
            className={`form-select${inputClassName ? ` ${inputClassName}` : ''}`}
            id={inputId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
          />
        </div>
      ) : (
        <div {...props}>
          <select
            ref={selectEl}
            className={`form-select${inputClassName ? ` ${inputClassName}` : ''}`}
            id={inputId}
            name={name}
            onChange={(v)=>{
              if ((!v.target.value) && (onChange)) onChange('')
            }}
            multiple={type === 'multiple' ? true : undefined}
            required={required}
            disabled={disabled}
          />
        </div>
      )}
    </>
  )
}

export default SelectBox
