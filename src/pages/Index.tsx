import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  occasion: string;
  description: string;
};

type CartItem = Product & { quantity: number };

const occasions = [
  { id: 'all', label: 'Все букеты', icon: 'Flower2' },
  { id: 'birthday', label: 'День рождения', icon: 'Cake' },
  { id: 'wedding', label: 'Свадьба', icon: 'Heart' },
  { id: 'anniversary', label: 'Годовщина', icon: 'Gift' },
  { id: 'sympathy', label: 'Соболезнования', icon: 'CloudRain' },
  { id: 'romantic', label: 'Романтика', icon: 'Sparkles' },
];

const products: Product[] = [
  { id: 1, name: 'Лунный сад', price: 4500, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/e28d9424-c7b6-4e1a-8af8-fbfc75b8afa8.jpg', occasion: 'romantic', description: 'Нежные пионовидные розы и эвкалипт' },
  { id: 2, name: 'Звездная пыль', price: 5200, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/be284340-fcdb-4a13-9957-caeef946b538.jpg', occasion: 'birthday', description: 'Яркий микс из гортензий и роз' },
  { id: 3, name: 'Млечный путь', price: 6800, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/578bb172-b2f7-43f4-8750-504265310540.jpg', occasion: 'wedding', description: 'Классический букет из белых роз и орхидей' },
  { id: 4, name: 'Северное сияние', price: 3900, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/e28d9424-c7b6-4e1a-8af8-fbfc75b8afa8.jpg', occasion: 'anniversary', description: 'Элегантные каллы и зелень' },
  { id: 5, name: 'Комета', price: 4200, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/e28d9424-c7b6-4e1a-8af8-fbfc75b8afa8.jpg', occasion: 'romantic', description: 'Романтичный букет из тюльпанов' },
  { id: 6, name: 'Галактика', price: 5500, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/be284340-fcdb-4a13-9957-caeef946b538.jpg', occasion: 'birthday', description: 'Яркие герберы и хризантемы' },
  { id: 7, name: 'Полярная звезда', price: 3500, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/578bb172-b2f7-43f4-8750-504265310540.jpg', occasion: 'sympathy', description: 'Спокойные белые лилии' },
  { id: 8, name: 'Солнечный ветер', price: 4800, image: 'https://cdn.poehali.dev/projects/bd72c75a-6e6d-4eec-9912-e40e229cc615/files/be284340-fcdb-4a13-9957-caeef946b538.jpg', occasion: 'birthday', description: 'Солнечные подсолнухи и розы' },
];

const reviews = [
  { id: 1, name: 'Анна Петрова', rating: 5, text: 'Восхитительные букеты! Заказывала на годовщину, цветы свежие и стояли две недели.', date: '15 ноября 2024' },
  { id: 2, name: 'Михаил Соколов', rating: 5, text: 'Быстрая доставка и отличное качество. Рекомендую!', date: '10 ноября 2024' },
  { id: 3, name: 'Елена Смирнова', rating: 5, text: 'Заказываю здесь постоянно. Букеты всегда превосходят ожидания!', date: '5 ноября 2024' },
];

export default function Index() {
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const filteredProducts = selectedOccasion === 'all' 
    ? products 
    : products.filter(p => p.occasion === selectedOccasion);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Flower2" size={32} className="text-primary" />
            <h1 className="text-3xl font-semibold tracking-wide">MOON.FLOWERS</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {['home', 'catalog', 'about', 'delivery', 'reviews', 'contacts'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm uppercase tracking-wider transition-colors hover:text-primary ${
                  activeSection === section ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'catalog' && 'Каталог'}
                {section === 'about' && 'О нас'}
                {section === 'delivery' && 'Доставка'}
                {section === 'reviews' && 'Отзывы'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingBag" size={20} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-medium">
                        <span>Итого:</span>
                        <span>{totalAmount.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {activeSection === 'home' && (
        <section className="relative py-20 md:py-32 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-light tracking-wide">
                Букеты, которые говорят больше слов
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Создаём композиции для каждого момента вашей жизни. Свежие цветы, доставка в день заказа.
              </p>
              <Button 
                size="lg" 
                className="mt-8"
                onClick={() => setActiveSection('catalog')}
              >
                Выбрать букет
              </Button>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl text-center mb-12">Наш каталог</h2>
            
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {occasions.map(occasion => (
                <Button
                  key={occasion.id}
                  variant={selectedOccasion === occasion.id ? 'default' : 'outline'}
                  onClick={() => setSelectedOccasion(occasion.id)}
                  className="gap-2"
                >
                  <Icon name={occasion.icon as any} size={18} />
                  {occasion.label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-medium">{product.price.toLocaleString()} ₽</span>
                      <Button onClick={() => addToCart(product)} size="sm">
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl text-center mb-12">О магазине</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                MOON.FLOWERS — это не просто магазин цветов. Мы создаём эмоции и помогаем выразить чувства через язык цветов.
              </p>
              <p className="text-lg leading-relaxed">
                Каждый букет собирается вручную нашими флористами с многолетним опытом. Мы работаем только со свежими цветами от проверенных поставщиков и гарантируем качество каждой композиции.
              </p>
              <p className="text-lg leading-relaxed">
                Наша миссия — делать особенными каждый праздник и важный момент в вашей жизни.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl text-center mb-12">Доставка</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Icon name="Clock" size={40} className="mx-auto text-primary" />
                  <h3 className="text-xl font-medium">Быстро</h3>
                  <p className="text-muted-foreground">Доставка в день заказа от 2 часов</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Icon name="MapPin" size={40} className="mx-auto text-primary" />
                  <h3 className="text-xl font-medium">Удобно</h3>
                  <p className="text-muted-foreground">Доставка по всему городу и области</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Icon name="Package" size={40} className="mx-auto text-primary" />
                  <h3 className="text-xl font-medium">Аккуратно</h3>
                  <p className="text-muted-foreground">Бережная упаковка и транспортировка</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 space-y-4 text-muted-foreground">
              <p className="text-lg"><strong>Стоимость доставки:</strong> от 500 ₽ в зависимости от района</p>
              <p className="text-lg"><strong>Бесплатная доставка:</strong> при заказе от 5000 ₽</p>
              <p className="text-lg"><strong>Время работы:</strong> ежедневно с 9:00 до 21:00</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl text-center mb-12">Отзывы</h2>
            <div className="space-y-6">
              {reviews.map(review => (
                <Card key={review.id}>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-lg">{review.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl text-center mb-12">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@moon-flowers.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Цветочная, д. 15</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-medium mb-4">Напишите нам</h3>
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="w-full px-4 py-2 border border-input rounded-md bg-background"
                  />
                  <input 
                    type="tel" 
                    placeholder="Телефон" 
                    className="w-full px-4 py-2 border border-input rounded-md bg-background"
                  />
                  <textarea 
                    placeholder="Ваше сообщение" 
                    rows={4}
                    className="w-full px-4 py-2 border border-input rounded-md bg-background"
                  />
                  <Button className="w-full">Отправить</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border/40 mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Flower2" size={24} className="text-primary" />
              <span className="text-xl font-medium">MOON.FLOWERS</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}