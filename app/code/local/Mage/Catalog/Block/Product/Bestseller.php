<?php
class Mage_Catalog_Block_Product_Bestseller extends Mage_Catalog_Block_Product_List
{

    public function __construct()
    {

        parent::__construct();




        $totalPerPage = ($this->show_total) ? $this->show_total : 6;
        $counter = 1;
        $visibility = array(
            Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH,
            Mage_Catalog_Model_Product_Visibility::VISIBILITY_IN_CATALOG
        );

        $storeId = Mage::app()->getStore()->getId();
        $this->_productCollection = Mage::getResourceModel('reports/product_collection')
            ->addAttributeToSelect('*')
            ->addOrderedQty()
//                              ->addAttributeToFilter('visibility', $visibility)
//                              ->addAttributeToFilter('status', array('eq' => 1))
            ->setOrder('ordered_qty', 'desc');

/*
        $storeId = Mage::app()->getStore()->getId();

        $products = Mage::getResourceModel('reports/product_collection')->addOrderedQty()->addAttributeToSelect('id')->addAttributeToSelect(array(
            'name',
            'price',
            'small_image'
        ))->setStoreId($storeId)->addStoreFilter($storeId)->setOrder('ordered_qty', 'desc'); // most best sellers on top

        Mage::getSingleton('catalog/product_status')->addVisibleFilterToCollection($products);

        Mage::getSingleton('catalog/product_visibility')->addVisibleInCatalogFilterToCollection($products);

        $products->setPageSize(3)->setCurPage(1);

        $this->setProductCollection($products);
*/
    }

}