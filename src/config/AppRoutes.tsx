import { lazy } from "react"
import { Routes, Route } from "react-router"

const HomePage = lazy(() => import('../pages/Home'))
const AllListBuku = lazy(() => import('../pages/AllListBuku'))
const MenuDetail = lazy(() => import('../pages/MenuDetail'))
const UpdateBuku = lazy(() => import('../pages/UpdateBuku'))
const PinjamBuku = lazy(() => import('../pages/PinjamBuku'))
const KembalikanBuku = lazy(() => import('../pages/KembalikanBuku'))

export const AppRoutes = () => {
  return <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/listbuku' element={<AllListBuku />} />
    <Route path='/listbuku/:id' element={<MenuDetail />} />
    <Route path='/updatebuku/:id' element={<UpdateBuku />} />
    <Route path='/listbuku/:id/pinjam' element={<PinjamBuku />} />
    <Route path='/listbuku/:id/balik' element={<KembalikanBuku />} />
  </Routes>
}