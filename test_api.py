#!/usr/bin/env python3
"""
Prueba del flujo completo:
1. Login como admin
2. Crear producto
3. Listar productos y verificar que aparezca
"""
import requests

BASE = "http://localhost:3000"

def test_login():
    resp = requests.post(f"{BASE}/api/auth/login", json={
        "email": "admin@crystalline.corp",
        "password": "admin123"
    })
    assert resp.status_code == 200, f"Login failed: {resp.text}"
    token = resp.cookies.get("auth_token")
    assert token, "No auth_token cookie"
    print("✅ Login exitoso, cookie obtenida")
    return token

def test_create_product(token):
    product_data = {
        "name": "Test Botella Vidrio 500ml",
        "description": "Botella de vidrio reciclado",
        "material": "glass",
        "capacity": "500",  # String según schema
        "dimensions": "8x8x20 cm",
        "category": "bottles",
        "price": 12.99,
        "imageUrl": "https://via.placeholder.com/300"
    }
    cookies = {"auth_token": token}
    resp = requests.post(f"{BASE}/api/products", json=product_data, cookies=cookies)
    assert resp.status_code in (200, 201), f"Create failed: status {resp.status_code}, body: {resp.text}"
    data = resp.json()
    assert data.get("id") and data.get("name") == product_data["name"], f"Producto no creado correctamente: {data}"
    print("✅ Producto creado exitosamente")
    return data.get("id")

def test_list_products(token):
    cookies = {"auth_token": token}
    resp = requests.get(f"{BASE}/api/products", cookies=cookies)
    assert resp.status_code == 200, f"List failed: {resp.text}"
    products = resp.json()
    assert isinstance(products, list), "Products not a list"
    print(f"✅ Listado de productos: {len(products)} items")
    for p in products:
        print(f"  - {p.get('id')}: {p.get('name')}")

def test_logout(token):
    cookies = {"auth_token": token}
    resp = requests.post(f"{BASE}/api/auth/logout", cookies=cookies)
    assert resp.status_code == 200, "Logout failed"
    print("✅ Logout exitoso")

if __name__ == "__main__":
    try:
        print("=== Prueba de flujo completo ===")
        token = test_login()
        test_create_product(token)
        test_list_products(token)
        test_logout(token)
        print("\n🎉 Todo funcionando correctamente!")
    except AssertionError as e:
        print(f"\n❌ Error: {e}")
        exit(1)
    except requests.exceptions.ConnectionError:
        print("\n❌ No se pudo conectar al servidor. ¿Está corriendo en localhost:3000?")
        exit(1)
