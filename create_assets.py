#!/usr/bin/env python3
"""
Script para crear assets básicos para IA Guide
Killerfozx Company - Generación de imágenes temporales
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_cover_image():
    """Crear imagen cover para Open Graph (1200x630)"""
    img_cover = Image.new('RGB', (1200, 630), color='#667eea')
    draw = ImageDraw.Draw(img_cover)

    # Gradiente simple
    for y in range(630):
        color = (102 + int(y*0.2), 126 - int(y*0.1), 234 - int(y*0.2))
        draw.line([(0, y), (1200, y)], fill=color)

    # Texto principal
    try:
        font_large = ImageFont.truetype('arial.ttf', 60)
        font_medium = ImageFont.truetype('arial.ttf', 40)
    except:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()

    draw.text((600, 200), 'IA Guide', fill='white', anchor='mm', font=font_large)
    draw.text((600, 280), 'Guía Completa de', fill='white', anchor='mm', font=font_medium)
    draw.text((600, 330), 'Inteligencia Artificial 2024', fill='white', anchor='mm', font=font_medium)

    img_cover.save('assets/img/ia-guide-cover.jpg', quality=85)
    print('✅ ia-guide-cover.jpg creado (1200x630px)')
    return True

def create_logo():
    """Crear logo para schema markup (200x200)"""
    img_logo = Image.new('RGBA', (200, 200), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img_logo)

    # Círculo fondo
    draw.ellipse([20, 20, 180, 180], fill='#764ba2')

    # Texto logo
    try:
        font_logo = ImageFont.truetype('arial.ttf', 24)
    except:
        font_logo = ImageFont.load_default()

    draw.text((100, 80), '🦊', fill='white', anchor='mm', font=font_logo)
    draw.text((100, 120), 'IA', fill='white', anchor='mm', font=font_logo)

    img_logo.save('assets/img/logo.png')
    print('✅ logo.png creado (200x200px)')
    return True

def main():
    """Función principal"""
    print('🦊 Creando assets para IA Guide...')
    
    # Crear directorio si no existe
    os.makedirs('assets/img', exist_ok=True)
    
    # Generar assets
    success = True
    success &= create_cover_image()
    success &= create_logo()
    
    if success:
        print('\n✅ Todos los assets creados exitosamente')
        print('📁 Ubicación: assets/img/')
        print('🌐 Listo para GitHub Pages deployment')
    else:
        print('\n❌ Error creando assets')
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
