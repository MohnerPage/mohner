'use client';

import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Nota: En un entorno de servidor real, registraríamos fuentes personalizadas. 
// Usaremos las estándar para máxima compatibilidad.

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#1A73E8',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#5F6368',
  },
  hero: {
    marginBottom: 40,
    backgroundColor: '#F8F9FA',
    padding: 30,
    borderRadius: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#202124',
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#5F6368',
    lineHeight: 1.5,
  },
  listContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  listHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#202124',
    marginBottom: 8,
    alignItems: 'center',
  },
  listHeaderTextContainer1: {
    flex: 2,
    marginLeft: 75,
  },
  listHeaderTextContainer2: {
    flex: 1.5,
    paddingLeft: 10,
  },
  listHeaderTextContainer3: {
    flex: 1,
  },
  listHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#5F6368',
  },
  listHeaderTextRight: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#5F6368',
    textAlign: 'right',
  },
  listItem: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EAED',
    alignItems: 'center',
  },
  listImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F1F3F4',
    marginRight: 15,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listProductImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  listMainInfo: {
    flex: 2,
    justifyContent: 'center',
    paddingRight: 10,
  },
  listSpecsInfo: {
    flex: 1.5,
    justifyContent: 'center',
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#F1F3F4',
  },
  listPriceInfo: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  category: {
    fontSize: 8,
    color: '#1A73E8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#202124',
  },
  description: {
    fontSize: 8,
    color: '#5F6368',
    lineHeight: 1.4,
  },
  specItem: {
    fontSize: 9,
    color: '#3C4043',
    marginBottom: 3,
  },
  priceText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#9AA0A6',
  }
});

interface Product {
  id: number;
  name: string;
  description: string;
  material: string;
  capacity: string;
  dimensions: string;
  category: string;
  price: number;
  imageUrl?: string | null;
}

export const CatalogPDF = ({ products }: { products: Product[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>CRYSTALLINE</Text>
        <Text style={styles.title}>Catálogo de Envases 2024</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Soluciones Industriales</Text>
        <Text style={styles.heroSubtitle}>
          Líderes en fabricación de envases de vidrio y plástico para la industria alimentaria, farmacéutica y cosmética. Catálogo completo de referencias en inventario.
        </Text>
      </View>

      {/* Products List Format */}
      <View style={styles.listContainer}>
        {/* Cabecera de la tabla */}
        <View style={styles.listHeader}>
            <View style={styles.listHeaderTextContainer1}>
              <Text style={styles.listHeaderText}>PRODUCTO</Text>
            </View>
            <View style={styles.listHeaderTextContainer2}>
              <Text style={styles.listHeaderText}>ESPECIFICACIONES</Text>
            </View>
            <View style={styles.listHeaderTextContainer3}>
              <Text style={styles.listHeaderTextRight}>PRECIO UNITARIO</Text>
            </View>
        </View>

        {products.map((product) => (
          <View key={product.id} style={styles.listItem} wrap={false}>
            {/* Foto en Miniatura */}
            <View style={styles.listImageContainer}>
              {product.imageUrl && (
                <Image 
                  src={product.imageUrl.startsWith('http') ? product.imageUrl : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${product.imageUrl}`} 
                  style={styles.listProductImage} 
                />
              )}
            </View>
            
            {/* Información Principal */}
            <View style={styles.listMainInfo}>
              <Text style={styles.category}>{product.category}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.description}>{product.description ? product.description.substring(0, 75) + '...' : ''}</Text>
            </View>
            
            {/* Columnas de Especificaciones */}
            <View style={styles.listSpecsInfo}>
              <Text style={styles.specItem}>Mat: {product.material}</Text>
              <Text style={styles.specItem}>Cap: {product.capacity}ml</Text>
            </View>
            
            {/* Columna Precio */}
            <View style={styles.listPriceInfo}>
              <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>© 2024 CRYSTALLINE Container Corporation - Todos los derechos reservados.</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
      </View>
    </Page>
  </Document>
);
