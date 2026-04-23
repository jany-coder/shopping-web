import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { useAdminProducts } from '../../hooks/useAdminProducts'

type ProductManagerProps = {
  embedded?: boolean
}

export function ProductManager({ embedded = false }: ProductManagerProps) {
  const { state, reload, createProduct, removeProduct, busyId } = useAdminProducts()
  const [sku, setSku] = useState('')
  const [stock, setStock] = useState('10')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [cta, setCta] = useState('Explore Now')
  const [skuError, setSkuError] = useState('')

  function resetForm() {
    setSku('')
    setStock('10')
    setTitle('')
    setCategory('')
    setPrice('')
    setImageUrl('')
    setCta('Explore Now')
    setSkuError('')
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSkuError('')
    const result = await createProduct({
      sku: sku.trim(),
      stock: stock.trim() ? Number.parseInt(stock, 10) : undefined,
      title: title.trim(),
      category: category.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      cta: cta.trim() || undefined,
      price: price.trim() ? Number(price) : undefined,
    })
    if (result.ok) {
      toast.success('Product added successfully')
      resetForm()
      return
    }
    if (result.status === 409 || result.message.toLowerCase().includes('duplicate')) {
      setSkuError(result.message)
    }
    toast.error(result.message)
  }

  const products = state.status === 'ready' ? state.products : []

  return (
    <section className={embedded ? 'mt-5 space-y-5' : 'mt-8 rounded-2xl border border-ink/10 bg-surface p-4 shadow-md md:p-6'}>
      {!embedded ? (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0 text-lg font-semibold text-ink">Products</h2>
          <button className="rounded border border-ink/15 bg-white px-3 py-1 text-sm text-ink/80 hover:bg-ink/5" onClick={reload} type="button">
            Refresh
          </button>
        </div>
      ) : null}

      <form className="grid gap-3 md:grid-cols-2" onSubmit={(e) => void onSubmit(e)}>
        <input
          className={`rounded-lg border px-3 py-2.5 text-sm outline-none ring-0 transition ${
            skuError ? 'border-red-400 focus:border-red-500' : 'border-ink/15 bg-white focus:border-ink/40'
          }`}
          placeholder="sku (unique)"
          value={sku}
          onChange={(e) => {
            setSku(e.target.value)
            if (skuError) setSkuError('')
          }}
          required
        />
        <input
          className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-ink/40"
          placeholder="stock (optional, default 10)"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min={0}
          step={1}
          type="number"
        />
        {skuError ? <p className="-mt-2 text-xs text-red-700 md:col-span-2">{skuError}</p> : null}
        <input
          className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-ink/40"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-ink/40"
          placeholder="category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-ink/40"
          placeholder="price (optional)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-ink/40 md:col-span-2"
          placeholder="imageUrl (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-ink/40 md:col-span-2"
          placeholder="cta"
          value={cta}
          onChange={(e) => setCta(e.target.value)}
        />
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex min-w-40 items-center justify-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:brightness-95 disabled:opacity-60"
              disabled={busyId === '__create__'}
              type="submit"
            >
              {busyId === '__create__' ? 'Adding…' : 'Add product'}
            </button>
            <button
              type="button"
              className="inline-flex min-w-28 items-center justify-center rounded-lg border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink/80 hover:bg-ink/5"
              onClick={resetForm}
              disabled={busyId === '__create__'}
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink/75">Product list</p>
          <button
            className="rounded-md border border-ink/15 bg-white px-2.5 py-1 text-xs text-ink/80 hover:bg-ink/5"
            onClick={reload}
            type="button"
          >
            Refresh list
          </button>
        </div>
        {state.status === 'loading' ? <p className="text-sm text-ink/55">Loading products…</p> : null}
        {state.status === 'error' ? <p className="text-sm text-red-700">{state.message}</p> : null}
        {state.status === 'ready' && products.length === 0 ? (
          <p className="text-sm text-ink/55">No products found.</p>
        ) : null}
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-ink/10 bg-white px-3 py-2.5 text-sm shadow-sm"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{p.title}</p>
              <p className="truncate text-xs text-ink/55">
                {p.sku} • Stock {p.stock} • {p.category}
              </p>
            </div>
            <button
              type="button"
              className="rounded-md border border-red-300 bg-white px-2.5 py-1 text-xs text-red-700 hover:bg-red-50 disabled:opacity-50"
              disabled={busyId === p.id}
              onClick={() => {
                void removeProduct(p.id).then((result) => {
                  if (result.ok) toast.success('Product removed')
                  else toast.error(result.message)
                })
              }}
            >
              {busyId === p.id ? 'Removing…' : 'Remove'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
