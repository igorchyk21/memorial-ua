"use client"
import React, { useEffect, useRef, useState } from "react";
import Croppie from "croppie";
import "croppie/croppie.css";
import { Alert, Button } from "react-bootstrap";
import { useTranslations } from "next-intl";
import BlockSpinner from "../spinners/BlockSpinner";
import SpinnerTitle from "../spinners/SpinnerTitle";

type ContainerSize = { width: number; height: number } | null;

interface ImageCropperProps {
  imageUrl?: string | null;
  disabled?: boolean;
  loaded?: boolean;
  editMode?:boolean;
  onCrop: (dataUrlBase64: string) => void;
  onError?: (err: Error) => void; // <- опційно
} 

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  disabled,
  loaded = false,
  editMode,
  onCrop,
  onError,
}) => {
  const croppieRef = useRef<HTMLDivElement | null>(null);
  const croppieInstance = useRef<Croppie | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [containerSize, setContainerSize] = useState<ContainerSize>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();

  // утиліта: перевірка доступності зображення
  const ensureImageLoads = (url: string) =>
    new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () =>
        reject(new Error("Image failed to load (onerror)."));
      img.src = url;
    });

  // Визначаємо розміри контейнера
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, []);

  // Створення / оновлення Croppie + bind із перехопленням помилок
  useEffect(() => {
    if (!containerSize || !croppieRef.current) return;

    // знищити попередній інстанс
    croppieInstance.current?.destroy();

    // ініціалізація
    croppieInstance.current = new Croppie(croppieRef.current, {
      viewport: {
        width: containerSize.width,
        height: containerSize.height,
      },
      showZoomer: true,
      enableOrientation: true,
    });

    const applySliderClass = () => {
      const slider =
        croppieRef.current?.querySelector<HTMLInputElement>(".cr-slider");
      if (slider) slider.className = "form-range";
    };

    let cancelled = false;
    setError(null); // очистити попередню помилку

    const doBind = async () => {
      try {
        if (imageUrl) {
          // 1) попередня перевірка
          await ensureImageLoads(imageUrl);
          // 2) bind до croppie
          await croppieInstance.current!.bind({ url: imageUrl });
          if (!cancelled) applySliderClass();
        } else {
          // немає зображення — просто стилізуємо слайдер, якщо він є
          if (!cancelled) applySliderClass();
        }
      } catch (e) {
        if (cancelled) return;
        const err = e instanceof Error ? e : new Error(String(e));
        setError(t('Error load image'));
        onError?.(err);
      }
    };

    doBind();

    return () => {
      cancelled = true;
      croppieInstance.current?.destroy();
      croppieInstance.current = null;
    };
  }, [imageUrl, containerSize, t, onError]);

  // Обертання
  const handleRotate = () => {
    if (croppieInstance.current) {
      const newRotation = (rotation - 90) % 360;
      croppieInstance.current.rotate(-90);
      setRotation(newRotation);
    }
  };

  // Обрізка
  const handleCrop = async () => {
    if (!croppieInstance.current) {
      setError("Croppie instance is not available.");
      return;
    }
    try {
      const dataUrl = (await croppieInstance.current.result({
        type: "base64",
        size: "original",
      })) as string;
      onCrop(dataUrl);
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError('Failed to crop the image');
      onError?.(err);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="py-2">
          {error}
        </Alert>
      )}

      <div className="d-flex align-items-center flex-flow-column mb-5">
        <div className={`card-photo m-auto ${!editMode ? 'no-slider' : ''}`}>
          <div className="p-2" ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <div ref={croppieRef}>
              <BlockSpinner show={disabled} borderRadius="8px" />
            </div>
          </div>
        </div>
      </div>

      {editMode &&
      (<div className="pt-3 text-center">
        <Button className="mx-1" variant="primary" onClick={handleCrop} disabled={disabled}>
          <SpinnerTitle
            showSpinner={loaded}
            titleButton={
              <>
                <i className="ci-save me-2"/>{t("buttons.save")}
              </>
            }
          />
        </Button>

        <Button className="mx-1" variant="secondary" onClick={handleRotate} disabled={disabled}>
          <i className="ci-rotate-cw me-2"/>
          {t("buttons.rotate")}
        </Button>
      </div>)}
    </>
  );
};

export default ImageCropper;
