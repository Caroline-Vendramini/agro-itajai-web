import { useCallback, useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaPencilAlt } from "react-icons/fa";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import { useLoader } from "../../../hooks/useLoader";
import useModal from "../../../hooks/useModal";
import { formatMoney, moneyToNumber, profitMargin } from "../../../utils/money";
import { stringToNumber } from "../../../utils/number";
import { searchString } from "../../../utils/string";
import ProductDetailsModal from "../components/ProductDetailsModal";
import ProductEntryModal from "../components/ProductEntryModal";
import ProductOutModal from "../components/ProductOutModal";
import RegisterProductModal from "../components/RegisterProductModal";
import UpdateProductModal from "../components/UpdateProductModal";
import UpdateProductPriceModal from "../components/UpdateProductPriceModal";
import "./index.css";
import useAxios from "../../../hooks/useAxios";
import BrandsModal from "../components/BrandsModal";
import CategoriesModal from "../components/CategoriesModal";

const columns = [
  { Header: "Produto", accessor: "name" },
  { Header: "Marca", accessor: "brand" },
  { Header: "Categoria", accessor: "category" },
  { Header: "Estoque", accessor: "stock" },
  { Header: "R$ Compra", accessor: "cost" },
  { Header: "R$ Venda", accessor: "price" },
  { Header: "% Lucro", accessor: "profit" },
  { Header: "Ações", accessor: "action" },
];

function Estoque() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [updateProductPrice, setUpdateProductPrice] = useState(null);
  const [productEntry, setProductEntry] = useState(null);
  const [productOut, setProductOut] = useState(null);
  const [newProductPrices, setNewProductPrices] = useState({
    price: "",
    cost: "",
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productDetails, setProductDetails] = useState(null);

  const { showLoader, hideLoader } = useLoader();
  const { fetchData } = useAxios();

  const { isModalOpen, toggleModal } = useModal();
  const {
    isModalOpen: registerProductModal,
    toggleModal: toggleRegisterProductModal,
  } = useModal();
  const {
    isModalOpen: updateProductModal,
    toggleModal: toggleUpdateProductModal,
  } = useModal();
  const {
    isModalOpen: updateProductPriceModal,
    toggleModal: toggleUpdateProductPriceModal,
  } = useModal();
  const {
    isModalOpen: productEntryModal,
    toggleModal: toggleProductEntryModal,
  } = useModal();
  const { isModalOpen: productOutModal, toggleModal: toggleProductOutModal } =
    useModal();
  const { isModalOpen: brandsModal, toggleModal: toggleBrandsModal } =
    useModal();
  const { isModalOpen: categoriesModal, toggleModal: toggleCategoriesModal } =
    useModal();

  const handleSearch = useCallback(() => {
    if (!search) {
      setFilteredProducts(products);
      return;
    }
    showLoader();
    const filtered = products.filter(
      (user) =>
        searchString(user.name, search) ||
        searchString(user.brand, search) ||
        searchString(user.category, search) ||
        searchString(user.stock, search)
    );
    setFilteredProducts(filtered);
    hideLoader();
  }, [search, products]);

  const fetchProducts = useCallback(async () => {
    showLoader();
    try {
      const [response, brandsResponse, categoriesResponse] = await Promise.all([
        fetchData({
          url: "products/store/products",
        }),
        fetchData({
          url: "brands",
        }),
        fetchData({
          url: "categories",
        }),
      ]);
      setBrands(brandsResponse.data);
      setCategories(categoriesResponse.data);
      const mappedProducts = response.data.map((product) => {
        return {
          ...product,
          brand: product.Brand?.name ?? "Sem marca",
          category: product.Category?.name ?? "Sem categoria",
          cost: formatMoney(product.cost),
          stock: `${product.stock} ${product.measureUnit ?? ""}`,
          price: formatMoney(product.price),
          profit: profitMargin(product.cost, product.price),
          action: (
            <div style={{ display: "flex", gap: "2px" }}>
              <Button
                small
                onClick={() => {
                  setProductDetails(product);
                  toggleModal();
                }}
                title="Detalhes do produto"
              >
                <CgDetailsMore />
              </Button>
              <Button
                small
                onClick={() => {
                  setUpdateProduct(product);
                  toggleUpdateProductModal();
                  const brandId = product.brandId;
                  const categoryId = product.categoryId;
                  setSelectedBrand(
                    brandsResponse.data.find((b) => b.id === brandId)?.name
                  );
                  setSelectedCategory(
                    categoriesResponse.data.find((c) => c.id === categoryId)
                      ?.name
                  );
                }}
                title="Atualizar produto"
              >
                <FaPencilAlt />
              </Button>
              <Button
                small
                variant="warning"
                onClick={() => {
                  setUpdateProductPrice(product);
                  toggleUpdateProductPriceModal();
                }}
                title="Atualizar preço"
              >
                $
              </Button>
              <Button
                small
                variant="warning"
                onClick={() => {
                  setProductEntry(product);
                  toggleProductEntryModal();
                }}
                title="Entrada de estoque"
              >
                +
              </Button>
              <Button
                small
                variant="warning"
                onClick={() => {
                  setProductOut(product);
                  toggleProductOutModal();
                }}
                title="Saída de estoque"
              >
                -
              </Button>
            </div>
          ),
        };
      });
      setProducts(mappedProducts);
      handleSearch();
    } catch (error) {
      console.error(error);
    }
    hideLoader();
  }, [toggleUpdateProductModal]);

  const handleOpenRegisterProduct = () => {
    toggleRegisterProductModal();
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    handleSearch();
  }, [search, products, handleSearch]);

  const handleSubmitUpdateProductPrice = (e) => {
    e.preventDefault();
    const { id, price, cost } = updateProductPrice;

    if (!price || !id || !cost) {
      alert("Preencha todos os campos");
      return;
    }

    fetchData({
      url: `product-price-history`,
      method: "post",
      data: {
        newPrice: moneyToNumber(price),
        productId: id,
        newCost: moneyToNumber(cost),
      },
    })
      .then(() => {
        fetchProducts();
        toggleUpdateProductPriceModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitProductEntry = (e) => {
    e.preventDefault();
    const { id, price, cost, quantity } = productEntry;

    if (!price || !id || !cost || !quantity) {
      alert("Preencha todos os campos");
      return;
    }

    if (quantity <= 0) {
      alert("Quantidade inválida");
      return;
    }

    fetchData({
      url: `stock-entries`,
      method: "post",
      data: {
        quantity: stringToNumber(quantity),
        productId: stringToNumber(id),
        unitCost: moneyToNumber(cost),
        unitPrice: moneyToNumber(price),
      },
    })
      .then(() => {
        fetchProducts();
        toggleProductEntryModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitProductOut = (e) => {
    e.preventDefault();
    const { id, quantity } = productOut;

    if (!quantity || !id) {
      alert("Preencha todos os campos");
      return;
    }

    if (quantity <= 0) {
      alert("Quantidade inválida");
      return;
    }

    fetchData({
      url: `stock-out`,
      method: "post",
      data: {
        quantity: stringToNumber(quantity),
        productId: stringToNumber(id),
      },
    })
      .then(() => {
        fetchProducts();
        toggleProductOutModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitUpdateProduct = (e) => {
    e.preventDefault();
    const { name, measureUnit, id, description } = updateProduct;

    if (!name || !measureUnit || !selectedBrand || !selectedCategory) {
      alert("Preencha todos os campos");
      return;
    }

    const brandId = brands.find((b) => b.name === selectedBrand)?.id;
    const categoryId = categories.find((c) => c.name === selectedCategory)?.id;

    if (!brandId || !categoryId) {
      alert("Marca ou categoria inválida");
      return;
    }

    fetchData({
      url: `products/${id}`,
      method: "patch",
      data: {
        name,
        measureUnit,
        brandId,
        categoryId,
        description,
      },
    })
      .then(() => {
        fetchProducts();
        toggleUpdateProductModal();
        setSelectedBrand("");
        setSelectedCategory("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const cost = formData.get("cost");
    const measureUnit = formData.get("measureUnit");
    const stock = formData.get("stock");
    const brand = formData.get("brand");
    const category = formData.get("category");

    if (
      !name ||
      !price ||
      !cost ||
      !measureUnit ||
      !stock ||
      !brand ||
      !category
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const brandId = brands.find((b) => b.name === brand)?.id;
    const categoryId = categories.find((c) => c.name === category)?.id;

    if (!brandId || !categoryId) {
      alert("Marca ou categoria inválida");
      return;
    }

    fetchData({
      url: "products",
      method: "post",
      data: {
        name,
        description,
        price: moneyToNumber(price),
        cost: moneyToNumber(cost),
        measureUnit,
        stock: moneyToNumber(stock),
        brandId,
        categoryId,
      },
    })
      .then(() => {
        fetchProducts();
        toggleRegisterProductModal();
        setSelectedBrand("");
        setSelectedCategory("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBrandClick = () => {
    toggleBrandsModal();
  }

  const handleCategoryClick = () => {
    toggleCategoriesModal();
  }

  return (
    <div className="estoque-container">
      {/* Modal de cadastro de produto */}
      <RegisterProductModal
        registerProductModal={registerProductModal}
        toggleRegisterProductModal={toggleRegisterProductModal}
        handleSubmitProduct={handleSubmitProduct}
        cost={newProductPrices.cost}
        setCost={(value) =>
          setNewProductPrices({ ...newProductPrices, cost: value })
        }
        price={newProductPrices.price}
        setPrice={(value) =>
          setNewProductPrices({ ...newProductPrices, price: value })
        }
        brands={brands.map((brand) => brand.name)}
        categories={categories.map((category) => category.name)}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Modal de detalhes do produto */}
      <ProductDetailsModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        productDetails={productDetails}
      />

      {/* Modal de atualização de produto */}
      <UpdateProductModal
        updateProductModal={updateProductModal}
        updateProduct={updateProduct}
        setUpdateProduct={setUpdateProduct}
        toggleUpdateProductModal={toggleUpdateProductModal}
        handleSubmitUpdateProduct={handleSubmitUpdateProduct}
        brands={brands.map((brand) => brand.name)}
        categories={categories.map((category) => category.name)}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Modal de atualização de preço de produto */}
      <UpdateProductPriceModal
        updateProductPriceModal={updateProductPriceModal}
        updateProductPrice={updateProductPrice}
        setUpdateProductPrice={setUpdateProductPrice}
        toggleUpdateProductPriceModal={toggleUpdateProductPriceModal}
        handleSubmitUpdateProductPrice={handleSubmitUpdateProductPrice}
      />

      {/* Modal de entrada de produto */}
      <ProductEntryModal
        productEntry={productEntry}
        setProductEntry={setProductEntry}
        productEntryModal={productEntryModal}
        toggleProductEntryModal={toggleProductEntryModal}
        handleSubmitProductEntry={handleSubmitProductEntry}
      />

      {/* Modal de saída de produto */}
      <ProductOutModal
        productOutModal={productOutModal}
        productOut={productOut}
        setProductOut={setProductOut}
        toggleProductOutModal={toggleProductOutModal}
        handleSubmitProductOut={handleSubmitProductOut}
      />

      {/* Modal de marcas */}
      <BrandsModal
        brands={brands}
        brandsModal={brandsModal}
        toggleBrandsModal={toggleBrandsModal}
      />

      {/* Modal de categorias */}
      <CategoriesModal
        categories={categories}
        categoriesModal={categoriesModal}
        toggleCategoriesModal={toggleCategoriesModal}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>

        <Typography variant={"h3"}>Estoque</Typography>

        <div style={{ display: "flex", gap: "6px" }}>
          <Button onClick={handleCategoryClick} variant="warning">Categorias</Button>
          <Button onClick={handleBrandClick} variant="warning">Marcas</Button>
        </div>

      </div>
      <div className="estoque-search-area">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          outerClassname="estoque-grow"
          placeholder={"Nome ou marca do produto"}
        />
        <Button variant="success" onClick={handleOpenRegisterProduct}>
          Novo produto
        </Button>
      </div>

      <Table>
        <Table.Head>
          {columns.map((column, index) => (
            <Table.Cell key={index}>{column.Header}</Table.Cell>
          ))}
        </Table.Head>
        <Table.Body>
          {filteredProducts.map((row, index) => (
            <Table.Row key={index}>
              {columns.map((column, index) => (
                <Table.Cell key={index}>{row[column.accessor]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Estoque;
