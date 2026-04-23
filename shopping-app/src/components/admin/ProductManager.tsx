import { useState, type FormEvent } from 'react'
import { useAdminProducts } from '../../hooks/useAdminProducts'

type ProductManagerProps = {
  embedded?: boolean
}

export function ProductManager({ embedded = false }: ProductManagerProps) {
  const { state, reload, createProduct, removeProduct, busyId, error } = useAdminProducts()
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [cta, setCta] = useState('Explore Now')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await createProduct({
      id: id.trim(),
      title: title.trim(),
      category: category.trim(),
      imageUrl: imageUrl.trim(),
      cta: cta.trim() || undefined,
      price: price.trim() ? Number(price) : undefined,
    })
    setId('')
    setTitle('')
    setCategory('')
    setPrice('')
    setImageUrl('')
    setCta('Explore Now')
  }

  const products = state.status === 'ready' ? state.products : []

  return (
    <section className={embedded ? 'mt-4' : 'mt-8 rounded-xl border border-zinc-200 bg-white p-4 md:p-6'}>
      {!embedded ? (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0 text-lg font-semibold text-zinc-900">Products</h2>
          <button className="rounded border border-zinc-300 px-3 py-1 text-sm" onClick={reload} type="button">
            Refresh
          </button>
        </div>
      ) : null}

      <form className="grid gap-2 md:grid-cols-2" onSubmit={(e) => void onSubmit(e)}>
        <input className="rounded border border-zinc-300 px-3 py-2 text-sm" placeholder="id" value={id} onChange={(e)=>setId(e.target.value)} required />
        <input className="rounded border border-zinc-300 px-3 py-2 text-sm" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <input className="rounded border border-zinc-300 px-3 py-2 text-sm" placeholder="category" value={category} onChange={(e)=>setCategory(e.target.value)} required />
        <input className="rounded border border-zinc-300 px-3 py-2 text-sm" placeholder="price (optional)" value={price} onChange={(e)=>setPrice(e.target.value)} />
        <input className="rounded border border-zinc-300 px-3 py-2 text-sm md:col-span-2" placeholder="imageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} required />
        <input className="rounded border border-zinc-300 px-3 py-2 text-sm md:col-span-2" placeholder="cta" value={cta} onChange={(e)=>setCta(e.target.value)} />
        <button
          className="rounded bg-ink px-4 py-2 text-sm font-medium text-white md:col-span-2 disabled:opacity-60"
          disabled={busyId === '__create__'}
          type="submit"
        >
          {busyId === '__create__' ? 'Adding…' : 'Add product'}
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-700">Product list</p>
          <button className="rounded border border-zinc-300 px-2.5 py-1 text-xs" onClick={reload} type="button">
            Refresh list
          </button>
        </div>
        {state.status === 'loading' ? <p className="text-sm text-zinc-500">Loading products…</p> : null}
        {state.status === 'error' ? <p className="text-sm text-red-700">{state.message}</p> : null}
        {state.status === 'ready' && products.length === 0 ? (
          <p className="text-sm text-zinc-500">No products found.</p>
        ) : null}
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded border border-zinc-200 px-3 py-2 text-sm">
            <div className="min-w-0">
              <p className="truncate font-medium text-zinc-800">{p.title}</p>
              <p className="truncate text-xs text-zinc-500">{p.id} • {p.category}</p>
            </div>
            <button
              type="button"
              className="rounded border border-red-300 px-2.5 py-1 text-xs text-red-700 disabled:opacity-50"
              disabled={busyId === p.id}
              onClick={() => void removeProduct(p.id)}
            >
              {busyId === p.id ? 'Removing…' : 'Remove'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
