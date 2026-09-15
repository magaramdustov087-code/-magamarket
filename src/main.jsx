import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Heart,
  User,
  Plus,
  ArrowLeft,
  MapPin,
  Camera,
  X,
} from "lucide-react";
import "./styles.css";

const listings = [
  {
    id: 1,
    title: "Toyota Camry 2021",
    price: "2 450 000 ₽",
    market: "2 850 000 ₽",
    discount: "−14%",
    city: "Москва",
    category: "Иномарки",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "BMW 530i 2020",
    price: "3 190 000 ₽",
    market: "3 650 000 ₽",
    discount: "−13%",
    city: "Москва",
    category: "Иномарки",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Lada Vesta 2023",
    price: "1 090 000 ₽",
    market: "1 260 000 ₽",
    discount: "−13%",
    city: "Казань",
    category: "Ростаз",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Yamaha MT-07",
    price: "790 000 ₽",
    market: "920 000 ₽",
    discount: "−14%",
    city: "Санкт-Петербург",
    category: "Двухколесные",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = ["Иномарки", "Ростаз", "Двухколесные", "Запчасти"];

function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    price: "",
    city: "",
    category: "Иномарки",
    description: "",
  });

  const [myListings, setMyListings] = useState([]);

  const allListings = [...myListings, ...listings];

  const filtered = allListings.filter((item) => {
    const text =
      `${item.title} ${item.city} ${item.category}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function openDetail(item) {
    setSelected(item);
    setPage("detail");
  }

  function updateForm(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function submitListing(e) {
    e.preventDefault();

    if (!form.title || !form.price || !form.city) {
      alert("Заполни название, цену и город");
      return;
    }

    const newListing = {
      id: Date.now(),
      title: form.title,
      price: `${form.price} ₽`,
      market: "Цена продавца",
      discount: "Новое",
      city: form.city,
      category: form.category,
      description: form.description,
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    };

    setMyListings((prev) => [newListing, ...prev]);

    setForm({
      title: "",
      price: "",
      city: "",
      category: "Иномарки",
      description: "",
    });

    setPage("home");
    alert("Объявление добавлено!");
  }

  function Card({ item }) {
    const favorite = favorites.includes(item.id);

    return (
      <div className="card" onClick={() => openDetail(item)}>
        <div className="card-image-wrap">
          <img src={item.image} alt={item.title} />

          <button
            className="favorite"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
          >
            <Heart
              size={20}
              fill={favorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="card-content">
          <div className="card-title">{item.title}</div>
          <div className="price">{item.price}</div>

          <div className="market">
            {item.market}
            <span>{item.discount}</span>
          </div>

          <div className="location">
            <MapPin size={15} />
            {item.city}
          </div>
        </div>
      </div>
    );
  }

  function BottomNav() {
    return (
      <div className="bottom-nav">
        <button onClick={() => setPage("home")}>
          <span>⌂</span>
          Главная
        </button>

        <button onClick={() => setPage("catalog")}>
          <Search size={22} />
          Каталог
        </button>

        <button onClick={() => setPage("favorites")}>
          <Heart size={22} />
          Избранное
        </button>

        <button onClick={() => setPage("profile")}>
          <User size={22} />
          Профиль
        </button>
      </div>
    );
  }

  if (page === "add") {
    return (
      <div className="app">
        <div className="topbar">
          <button onClick={() => setPage("profile")}>
            <ArrowLeft size={24} />
          </button>

          <strong>Подать объявление</strong>
        </div>

        <form className="listing-form" onSubmit={submitListing}>
          <div className="photo-upload">
            <Camera size={28} />
            <span>Добавить фото</span>
            <small>Фотографии подключим следующим этапом</small>
          </div>

          <label>
            Название
            <input
              value={form.title}
              onChange={(e) =>
                updateForm("title", e.target.value)
              }
              placeholder="Например: BMW 530i 2020"
            />
          </label>

          <label>
            Цена
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                updateForm("price", e.target.value)
              }
              placeholder="Цена в рублях"
            />
          </label>

          <label>
            Город
            <input
              value={form.city}
              onChange={(e) =>
                updateForm("city", e.target.value)
              }
              placeholder="Например: Москва"
            />
          </label>

          <label>
            Категория
            <select
              value={form.category}
              onChange={(e) =>
                updateForm("category", e.target.value)
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Описание
            <textarea
              value={form.description}
              onChange={(e) =>
                updateForm("description", e.target.value)
              }
              placeholder="Опиши автомобиль"
              rows="5"
            />
          </label>

          <button className="primary" type="submit">
            Опубликовать объявление
          </button>

          <button
            className="secondary"
            type="button"
            onClick={() => setPage("profile")}
          >
            Отмена
          </button>
        </form>
      </div>
    );
  }

  if (page === "detail" && selected) {
    return (
      <div className="app">
        <div className="topbar">
          <button onClick={() => setPage("catalog")}>
            <ArrowLeft size={24} />
          </button>

          <strong>Объявление</strong>

          <button
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>
        </div>

        <img
          className="detail-image"
          src={selected.image}
          alt={selected.title}
        />

        <div className="detail-content">
          <div className="category-label">
            {selected.category}
          </div>

          <h1>{selected.title}</h1>

          <div className="detail-price">
            {selected.price}
          </div>

          <div className="detail-row">
            <span>Рынок</span>
            <span>{selected.market}</span>
          </div>

          <div className="detail-row">
            <span>Город</span>
            <span>{selected.city}</span>
          </div>

          {selected.description && (
            <div className="description">
              {selected.description}
            </div>
          )}

          <button
            className="primary"
            onClick={() =>
              alert(
                "Связь с продавцом подключим через Telegram."
              )
            }
          >
            Связаться с продавцом
          </button>

          <button
            className="secondary"
            onClick={() => toggleFavorite(selected.id)}
          >
            <Heart size={19} />
            {favorites.includes(selected.id)
              ? "Убрать из избранного"
              : "В избранное"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="logo">МагаМаркет</div>
          <div className="subtitle">
            Автомобили по низу рынка
          </div>
        </div>

        <button
          className="profile-btn"
          onClick={() => setPage("profile")}
        >
          <User size={22} />
        </button>
      </header>

      {page === "home" && (
        <>
          <div className="search-box">
            <Search size={20} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Марка, модель или город"
            />
          </div>

          <section>
            <div className="section-title">
              Категории
            </div>

            <div className="categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSearch(category);
                    setPage("catalog");
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="section-title">
              Свежие объявления
            </div>

            <div className="cards">
              {filtered.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </section>
        </>
      )}

      {page === "catalog" && (
        <>
          <div className="page-title">Каталог</div>

          <div className="search-box">
            <Search size={20} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск"
            />
          </div>

          <div className="cards">
            {filtered.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      {page === "favorites" && (
        <>
          <div className="page-title">
            Избранное
          </div>

          <div className="cards">
            {allListings
              .filter((item) =>
                favorites.includes(item.id)
              )
              .map((item) => (
                <Card key={item.id} item={item} />
              ))}
          </div>

          {favorites.length === 0 && (
            <div className="empty">
              <Heart size={42} />
              <p>В избранном пока ничего нет</p>
            </div>
          )}
        </>
      )}

      {page === "profile" && (
        <div className="profile">
          <div className="profile-icon">
            <User size={45} />
          </div>

          <h2>Профиль</h2>

          <p>
            Здесь будут твои объявления,
            избранное и настройки.
          </p>

          <button
            className="primary"
            onClick={() => setPage("add")}
          >
            <Plus size={20} />
            Подать объявление
          </button>

          <button
            className="add-listing"
            onClick={() =>
              alert(
                "Оплату и продвижение объявления подключим следующим этапом."
              )
            }
          >
            Продвинуть объявление
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
