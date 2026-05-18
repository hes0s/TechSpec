import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DataService } from '../../data/services/data-service';
import { ItemModel } from '../../data/models/ItemModel';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { CartItem, LocalStorageService } from '../../data/services/local-storage-service';
import { OrderModel } from '../../data/models/OrderModel';
import { AuthService } from '../../data/services/auth-service';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test implements OnInit {
  ngOnInit(): void {
    this.getData();
  }
  private auth = inject(AuthService);
  private data = inject(DataService);
  private localS = inject(LocalStorageService);
  firestore = inject(Firestore);

  userOrders: OrderModel[] = [];
  items: ItemModel[] = [];
  cartItems: CartItem[] = [];

  getData() {
    this.data.getAlldata_products().subscribe({
      next: (res) => {
        this.items = res;
      },
      error: (err) => {
        console.log('error fetch data', err);
      },
    });
  }
  getCurent() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      console.log(typeof userEmail);
    } else {
      alert('You are not logged in');
    }
  }

  getCart() {
    this.cartItems = this.localS.getCart();
    console.log(this.cartItems);
  }

  loadUserOrders() {
    const userEmail = this.auth.getCurent();
    if (userEmail) {
      this.data.getUserOrders(userEmail).subscribe((orders: OrderModel[]) => {
        this.userOrders = orders;
        console.log(this.userOrders);
      });
    }
  }

  seedProducts() {
    const demo: Omit<ItemModel, 'id'>[] = [
      {
        name: 'MacBook Pro 14"',
        category: 'Laptopuri',
        description:
          'Laptop profesional Apple cu chip M3 Pro, ideal pentru creatori și dezvoltatori.',
        price: 1999,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'CPU', value: 'Apple M3 Pro' },
              { key: 'RAM', value: '18 GB' },
              { key: 'Stocare', value: '512 GB SSD' },
            ],
          },
          {
            name: 'Display',
            specs: [
              { key: 'Mărime', value: '14.2"' },
              { key: 'Rezoluție', value: '3024×1964' },
              { key: 'Refresh Rate', value: '120 Hz' },
            ],
          },
        ],
      },
      {
        name: 'Dell XPS 15',
        category: 'Laptopuri',
        description: 'Laptop premium Windows cu display OLED 4K și performanță excepțională.',
        price: 1749,
        imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'CPU', value: 'Intel Core i7-13700H' },
              { key: 'RAM', value: '16 GB DDR5' },
              { key: 'Stocare', value: '1 TB SSD' },
            ],
          },
          {
            name: 'Display',
            specs: [
              { key: 'Mărime', value: '15.6"' },
              { key: 'Tip', value: 'OLED 4K' },
              { key: 'Refresh Rate', value: '60 Hz' },
            ],
          },
        ],
      },
      {
        name: 'ASUS ROG Zephyrus G14',
        category: 'Laptopuri',
        description: 'Laptop gaming compact cu AMD Ryzen 9 și GPU dedicat.',
        price: 1499,
        imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'CPU', value: 'AMD Ryzen 9 7940HS' },
              { key: 'RAM', value: '32 GB DDR5' },
              { key: 'GPU', value: 'RTX 4060' },
            ],
          },
          {
            name: 'Display',
            specs: [
              { key: 'Mărime', value: '14"' },
              { key: 'Rezoluție', value: '2560×1600' },
              { key: 'Refresh Rate', value: '165 Hz' },
            ],
          },
        ],
      },
      {
        name: 'Lenovo ThinkPad X1 Carbon',
        category: 'Laptopuri',
        description: 'Laptop business ultralight cu autonomie excelentă și tastatură premium.',
        price: 1399,
        imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'CPU', value: 'Intel Core i7-1365U' },
              { key: 'RAM', value: '16 GB' },
              { key: 'Stocare', value: '512 GB SSD' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Capacitate', value: '57 Wh' },
              { key: 'Autonomie', value: 'până la 15h' },
            ],
          },
        ],
      },
      {
        name: 'Sony WH-1000XM5',
        category: 'Audio',
        description: 'Căști wireless over-ear cu cel mai bun noise cancelling din piață.',
        price: 349,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        sections: [
          {
            name: 'Audio',
            specs: [
              { key: 'Driver', value: '30 mm' },
              { key: 'Frecvență', value: '4Hz–40kHz' },
              { key: 'Impedanță', value: '48 Ω' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Autonomie', value: '30h' },
              { key: 'Încărcare', value: 'USB-C' },
              { key: 'Quick Charge', value: '3 min → 3h' },
            ],
          },
        ],
      },
      {
        name: 'Apple AirPods Pro 2',
        category: 'Audio',
        description: 'Căști in-ear cu ANC adaptiv și sunet spațial personalizat.',
        price: 249,
        imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500',
        sections: [
          {
            name: 'Audio',
            specs: [
              { key: 'Chip', value: 'Apple H2' },
              { key: 'ANC', value: 'Adaptiv' },
              { key: 'Sunet Spațial', value: 'Da' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Căști', value: '6h' },
              { key: 'Cu carcasă', value: '30h' },
              { key: 'Încărcare', value: 'USB-C / MagSafe' },
            ],
          },
        ],
      },
      {
        name: 'Bose QuietComfort 45',
        category: 'Audio',
        description: 'Căști over-ear confortabile cu noise cancelling și sunet echilibrat.',
        price: 279,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        sections: [
          {
            name: 'Audio',
            specs: [
              { key: 'Driver', value: '40 mm' },
              { key: 'Frecvență', value: '20Hz–20kHz' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Autonomie', value: '24h' },
              { key: 'Încărcare', value: 'USB-C' },
            ],
          },
        ],
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        category: 'Telefoane',
        description: 'Flagship Samsung cu S Pen integrat și camera de 200MP.',
        price: 1299,
        imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'CPU', value: 'Snapdragon 8 Gen 3' },
              { key: 'RAM', value: '12 GB' },
              { key: 'Stocare', value: '256 GB' },
            ],
          },
          {
            name: 'Camera',
            specs: [
              { key: 'Principal', value: '200 MP' },
              { key: 'Zoom', value: '100x Space Zoom' },
              { key: 'Video', value: '8K@30fps' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Capacitate', value: '5000 mAh' },
              { key: 'Încărcare', value: '45W' },
            ],
          },
        ],
      },
      {
        name: 'iPhone 15 Pro',
        category: 'Telefoane',
        description: 'Smartphone Apple cu chip A17 Pro și cadru din titan.',
        price: 1099,
        imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61339a5546?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'Chip', value: 'Apple A17 Pro' },
              { key: 'RAM', value: '8 GB' },
              { key: 'Stocare', value: '128 GB' },
            ],
          },
          {
            name: 'Camera',
            specs: [
              { key: 'Principal', value: '48 MP' },
              { key: 'Ultrawide', value: '12 MP' },
              { key: 'Video', value: '4K@120fps' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Autonomie', value: 'până la 23h' },
              { key: 'Încărcare', value: 'USB-C 27W' },
            ],
          },
        ],
      },
      {
        name: 'Google Pixel 8 Pro',
        category: 'Telefoane',
        description: 'Telefon Google cu cel mai bun software AI și cameră computațională.',
        price: 999,
        imageUrl: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'CPU', value: 'Google Tensor G3' },
              { key: 'RAM', value: '12 GB' },
              { key: 'Stocare', value: '128 GB' },
            ],
          },
          {
            name: 'Camera',
            specs: [
              { key: 'Principal', value: '50 MP' },
              { key: 'Teleobiectiv', value: '48 MP 5x' },
              { key: 'Video', value: '4K@60fps' },
            ],
          },
        ],
      },
      {
        name: 'Samsung Galaxy Tab S9',
        category: 'Tablete',
        description: 'Tabletă Android premium cu display AMOLED și S Pen inclus.',
        price: 799,
        imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'CPU', value: 'Snapdragon 8 Gen 2' },
              { key: 'RAM', value: '8 GB' },
              { key: 'Stocare', value: '128 GB' },
            ],
          },
          {
            name: 'Display',
            specs: [
              { key: 'Mărime', value: '11"' },
              { key: 'Tip', value: 'AMOLED' },
              { key: 'Rezoluție', value: '2560×1600' },
            ],
          },
        ],
      },
      {
        name: 'iPad Pro 12.9"',
        category: 'Tablete',
        description: 'Tabletă Apple cu chip M2 și display Liquid Retina XDR.',
        price: 1099,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4512929b0?w=500',
        sections: [
          {
            name: 'Hardware',
            specs: [
              { key: 'Chip', value: 'Apple M2' },
              { key: 'RAM', value: '8 GB' },
              { key: 'Stocare', value: '256 GB' },
            ],
          },
          {
            name: 'Display',
            specs: [
              { key: 'Mărime', value: '12.9"' },
              { key: 'Tip', value: 'Liquid Retina XDR' },
              { key: 'Refresh Rate', value: '120 Hz' },
            ],
          },
        ],
      },
      {
        name: 'LG UltraGear 27"',
        category: 'Monitoare',
        description: 'Monitor gaming QHD cu 165Hz și timp de răspuns de 1ms.',
        price: 399,
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        sections: [
          {
            name: 'Display',
            specs: [
              { key: 'Mărime', value: '27"' },
              { key: 'Rezoluție', value: '2560×1440' },
              { key: 'Refresh Rate', value: '165 Hz' },
              { key: 'Timp răspuns', value: '1 ms' },
            ],
          },
          {
            name: 'Conectivitate',
            specs: [
              { key: 'HDMI', value: '2× HDMI 2.0' },
              { key: 'DisplayPort', value: '1× DP 1.4' },
            ],
          },
        ],
      },
      {
        name: 'Dell UltraSharp 32"',
        category: 'Monitoare',
        description: 'Monitor profesional 4K cu acoperire 100% sRGB pentru designeri.',
        price: 699,
        imageUrl: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500',
        sections: [
          {
            name: 'Display',
            specs: [
              { key: 'Mărime', value: '32"' },
              { key: 'Rezoluție', value: '3840×2160' },
              { key: 'Tip panel', value: 'IPS' },
              { key: 'sRGB', value: '100%' },
            ],
          },
          {
            name: 'Conectivitate',
            specs: [
              { key: 'USB-C', value: '90W Power Delivery' },
              { key: 'HDMI', value: '2× HDMI 2.0' },
            ],
          },
        ],
      },
      {
        name: 'Logitech MX Master 3S',
        category: 'Periferice',
        description: 'Mouse wireless premium cu scroll electromagnetic și 8000 DPI.',
        price: 99,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        sections: [
          {
            name: 'Specificații',
            specs: [
              { key: 'DPI', value: '200–8000' },
              { key: 'Butoane', value: '7' },
              { key: 'Conectivitate', value: 'Bluetooth / USB' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Autonomie', value: '70 zile' },
              { key: 'Încărcare', value: 'USB-C' },
            ],
          },
        ],
      },
      {
        name: 'Keychron K2 Pro',
        category: 'Periferice',
        description: 'Tastatură mecanică wireless 75% cu switch-uri hot-swap.',
        price: 119,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
        sections: [
          {
            name: 'Specificații',
            specs: [
              { key: 'Layout', value: '75%' },
              { key: 'Switch', value: 'Gateron G Pro (hot-swap)' },
              { key: 'Conectivitate', value: 'Bluetooth 5.1 / USB-C' },
            ],
          },
          {
            name: 'Baterie',
            specs: [
              { key: 'Capacitate', value: '4000 mAh' },
              { key: 'Autonomie', value: 'până la 300h' },
            ],
          },
        ],
      },
      {
        name: 'Samsung 990 Pro 2TB',
        category: 'Stocare',
        description: 'SSD NVMe PCIe 4.0 cu viteze de citire până la 7450 MB/s.',
        price: 179,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        sections: [
          {
            name: 'Performanță',
            specs: [
              { key: 'Citire', value: '7450 MB/s' },
              { key: 'Scriere', value: '6900 MB/s' },
              { key: 'Interfață', value: 'PCIe 4.0 NVMe' },
            ],
          },
          {
            name: 'Specificații',
            specs: [
              { key: 'Capacitate', value: '2 TB' },
              { key: 'Format', value: 'M.2 2280' },
              { key: 'TBW', value: '1200 TBW' },
            ],
          },
        ],
      },
      {
        name: 'WD My Cloud EX2 Ultra',
        category: 'Stocare',
        description: 'NAS personal cu 2 sloturi și acces de oriunde prin cloud.',
        price: 299,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        sections: [
          {
            name: 'Specificații',
            specs: [
              { key: 'Sloturi', value: '2× HDD/SSD' },
              { key: 'CPU', value: 'Dual-core 1.3 GHz' },
              { key: 'RAM', value: '1 GB DDR3' },
            ],
          },
          {
            name: 'Conectivitate',
            specs: [
              { key: 'Ethernet', value: 'Gigabit' },
              { key: 'USB', value: '2× USB 3.0' },
            ],
          },
        ],
      },
      {
        name: 'Elgato Stream Deck MK.2',
        category: 'Periferice',
        description: 'Consolă cu 15 taste LCD programabile pentru streameri și creatori.',
        price: 149,
        imageUrl: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500',
        sections: [
          {
            name: 'Specificații',
            specs: [
              { key: 'Taste', value: '15 LCD (5×3)' },
              { key: 'Conectivitate', value: 'USB-C' },
              { key: 'Compatibilitate', value: 'Windows / macOS' },
            ],
          },
        ],
      },
      {
        name: 'Rode NT-USB Mini',
        category: 'Audio',
        description: 'Microfon USB condenser compact pentru podcasturi și streaming.',
        price: 99,
        imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500',
        sections: [
          {
            name: 'Audio',
            specs: [
              { key: 'Tip', value: 'Condenser' },
              { key: 'Polar Pattern', value: 'Cardioid' },
              { key: 'Frecvență', value: '20Hz–20kHz' },
            ],
          },
          {
            name: 'Conectivitate',
            specs: [
              { key: 'Interfață', value: 'USB-C' },
              { key: 'Headphone Jack', value: '3.5mm' },
            ],
          },
        ],
      },
    ];

    demo.forEach((p) => this.data.addProduct(p as ItemModel));
    alert('20 produse demo adăugate!');
  }
}
