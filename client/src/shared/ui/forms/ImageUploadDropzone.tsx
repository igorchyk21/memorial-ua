'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useRef } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { Upload, X } from 'react-bootstrap-icons';
import { useFormikContext } from 'formik';
import BlockSpinner from '../spinners/BlockSpinner';

interface ImagePreview {
  id: string;
  dataUrl: string;
  file: File;
}

interface Props {
  title: string;
  name: string; // Formik field name
}

export default function ImageUploadDropzone({ title, name }: Props) {
  const t = useTranslations();
  const { setFieldValue, isSubmitting } = useFormikContext<any>();

  // Локальний стан: файли + прев’ю
  const [items, setItems] = useState<ImagePreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Оновлюємо Formik лише коли змінюються файли
  React.useEffect(() => {
    const files = items.map((i) => i.file);
    setFieldValue(name, files);
  }, [items, name, setFieldValue]);

  const generateId = (file: File) =>
    `${file.name}-${file.size}-${file.lastModified}`;

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles = Array.from(fileList).filter((f) =>
      f.type.startsWith('image/')
    );

    const newPreviews = newFiles.map((file) => {
      const dataUrl = URL.createObjectURL(file);
      return {
        id: generateId(file),
        dataUrl,
        file,
      };
    });

    setItems((prev) => {
      // Уникаємо дублікатів
      const existingIds = prev.map((p) => p.id);
      const filtered = newPreviews.filter((np) => !existingIds.includes(np.id));
      return [...prev, ...filtered];
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const openFilePicker = () => fileInputRef.current?.click();

  const removeImage = (id: string) => {
    setItems((prev) => {
      const removed = prev.find((i) => i.id === id);
      if (removed) URL.revokeObjectURL(removed.dataUrl); // очищаємо пам’ять
      return prev.filter((i) => i.id !== id);
    });
  };

  return (
    <Card className="shadow-sm">
      <BlockSpinner show={isSubmitting}/>
      <Card.Body>
        <Card.Title className="mb-4">
          {title}
          {items.length > 0 && (
            <Badge bg="primary" className="ms-2">
              {items.length}
            </Badge>
          )}
        </Card.Title>

        {/* Drop Zone */}
        <div
          className={`border border-2 rounded-3 p-4 text-center transition-all ${
            isDragOver
              ? 'border-primary bg-primary bg-opacity-5'
              : 'border-dashed border-secondary'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{ cursor: 'pointer' }}
          onClick={openFilePicker}
        >
          <Upload size={48} className="text-muted mb-3" />
          <p className="mb-0">
            <strong>{t('dropWhere')}</strong>
          </p>
          <p className="text-muted small mb-3">{t('orSelectFiles')}</p>
          <Button variant="outline-primary" size="sm">
            {t('buttons.selectFiles')}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="d-none"
          onChange={(e) => handleFiles(e.target.files)}
        />
 
        {/* Image Previews */}
        {items.length > 0 && (
          <div className="mt-4">
            <Row xs={2} md={3} lg={4} className="g-3">
              {items.map((img) => (
                <Col key={img.id}>
                  <div className="position-relative">
                    <img
                      src={img.dataUrl}
                      alt="Preview"
                      className="img-fluid rounded shadow-sm"
                      style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                      }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center p-0"
                      style={{
                        width: '28px',
                        height: '28px',
                        transform: 'translate(50%, -50%)',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}