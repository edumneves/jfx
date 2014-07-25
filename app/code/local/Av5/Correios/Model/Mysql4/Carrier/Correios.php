<?php 
/**
 * AV5 Tecnologia
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL).
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * @category   Shipping (Frete)
 * @package    Av5_Correios
 * @copyright  Copyright (c) 2013 Av5 Tecnologia (http://www.av5.com.br)
 * @author     AV5 Tecnologia <anderson@av5.com.br>
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Av5_Correios_Model_Mysql4_Carrier_Correios
 *
 * @category   Shipping
 * @package    Av5_Correios
 * @author     AV5 Tecnologia <anderson@av5.com.br>
 */
class Av5_Correios_Model_Mysql4_Carrier_Correios extends Mage_Core_Model_Mysql4_Abstract {
    
	/**
	 * Valores padr�o para popular a tabela de pre�os
	 * Vetor de vetores com as seguintes posi��es:
	 * 0: Regi�o atendida
	 * 1: CEP destino inicial
	 * 2: CEP destino final
	 * 3: CEP destino refer�ncia
	 */
	protected $_defaultData = array(
		array('SP - Capital',1,9999999,4811210),
		array('SP - Interior',10000000,19999999,14801000),
		array('RJ - Capital',20000000,24799999,20270270),
		array('RJ - Interior',24800001,28999999,24800001),
		array('ES - Capital',29000000,29184999,29060370),
		array('ES - Interior',29185000,29999999,29200250),
		array('MG - Capital',30000000,34999999,30190000),
		array('MG - Interior',35000000,39999999,35930075),
		array('BA - Capital',40000000,43849999,40110010),
		array('BA - Interior',43850000,48999999,44260000),
		array('SE - Capital',49000000,49099999,49027000),
		array('SE - Interior',49100000,49999999,49220000),
		array('PE - Capital',50000000,54999999,50610360),
		array('PE - Interior',55000000,56999999,55805000),
		array('AL - Capital',57000000,57099999,57046270),
		array('AL - Interior',57100000,57999999,57230000),
		array('PB - Capital',58000000,58099999,58011040),
		array('PB - Interior',58100000,58999999,58428720),
		array('RN - Capital',59000000,59099000,59030380),
		array('RN - Interior',59100000,59999999,59140840),
		array('CE - Capital',60000000,61699999,60165082),
		array('CE - Interior',61700000,63999999,61930000),
		array('PI - Capital',64000000,64099999,64001280),
		array('PI - Interior',64100000,64999999,64310000),
		array('MA - Capital',65000000,65099000,65026260),
		array('MA - Interior',65100000,65999999,65275000),
		array('PA - Capital',66000000,67999999,66010902),
		array('PA - Interior',68000000,68899999,68385000),
		array('AP - Capital',68900000,68929999,68901100),
		array('AP - Interior',68930000,68999999,68970000),
		array('AM - Capital',69000000,69099000,69020210),
		array('AM - Interior',69100000,69299000,69110000),
		array('RR - Capital',69300000,69339999,69312450),
		array('RR - Interior',69340000,69399999,69340000),
		array('AM - Interior',69400000,69899999,69470000),
		array('AC - Capital',69900000,69920999,69906380),
		array('AC - Interior',69921000,69999999,69921000),
		array('DF - Capital',70000000,73699999,70040902),
		array('GO - Interior',73700000,76799999,75044450),
		array('RO - Capital',76800000,76834999,76829684),
		array('RO - Interior',76835000,76999999,76870762),
		array('TO - Capital',77000000,77299999,77020116),
		array('TO - Interior',77300000,77999999,77818550),
		array('MT - Capital',78000000,78169999,78020010),
		array('MT - Interior',78170000,78899999,78307000),
		array('MS - Capital',79000000,79124999,79002400),
		array('MS - Interior',79125000,79999999,79200000),
		array('PR - Capital',80000000,83729999,80010000),
		array('PR - Interior',83730000,87999999,84015070),
		array('SC - Capital',88000000,88139999,88010500),
		array('SC - Interior',88140000,89999999,88220000),
		array('RS - Capital',90000000,94999999,90450090),
		array('RS - Interior',95000000,99999999,95680000)
	);
	
	protected $_81019data = array(
		array('São Paulo',1000000,9999999,4811210),
		array('Santos',11000000,11249999,11000000),
		array('Bertioga',11250000,11299999,11250000),
		array('São Vicente',11300000,11399999,11300000),
		array('Guarujá',11400000,11499999,11400000),
		array('Cubatão',11500000,11599999,11500000),
		array('Praia Grande',11700000,11729999,11700000),
		array('Taubaté',12000000,12119999,12000000),
		array('São José dos Campos',12200000,12248999,12200000),
		array('Caçapava',12280000,12299999,12280000),
		array('Jacareí',12300000,12349999,12300000),
		array('Pindamonhangaba',12400000,12449999,12400000),
		array('Guaratinguetá',12500000,12524999,12500000),
		array('Bragança Paulista',12900000,12929999,12900000),
		array('Atibaia',12940000,12954999,12940000),
		array('Campinas',13000000,13139999,13000000),
		array('Paulínia',13140000,13140999,13140000),
		array('Sumaré',13170000,13182999,13170000),
		array('Hortolândia',13183000,13189999,13183000),
		array('Jundiaí',13200000,13219999,13200000),
		array('Valinhos',13270000,13279999,13270000),
		array('Vinhedo',13280000,13280999,13280000),
		array('Itu',13300000,13314999,13300000),
		array('Salto',13320000,13329999,13320000),
		array('Indaiatuba',13330000,13349999,13330000),
		array('Piracicaba',13400000,13427999,13400000),
		array('Artemis ( Distrito de Piracicaba)',13432000,13432999,13432000),
		array('Santa Bárbara DOeste',13450000,13459999,13450000),
		array('Nova Odessa',13460000,13464999,13460000),
		array('Americana',13465000,13479999,13465000),
		array('Limeira',13480000,13489999,13480000),
		array('Rio Claro',13500000,13507999,13500000),
		array('São Carlos',13560000,13577999,13560000),
		array('Araras',13600000,13609999,13600000),
		array('Ribeirão Preto',14000000,14114999,14000000),
		array('Sertãozinho',14160000,14179999,14160000),
		array('Franca',14400000,14414999,14400000),
		array('Araraquara',14800000,14811999,14800000),
		array('São Jose do Rio Preto',15000000,15099999,15000000),
		array('Catanduva',15800000,15819999,15800000),
		array('Araçatuba',16000000,16129999,16000000),
		array('Birigui',16200000,16209999,16200000),
		array('Bauru',17000000,17109999,17000000),
		array('Marilia',17500000,17529999,17500000),
		array('Sorocaba',18000000,18109999,18000000),
		array('Votorantim',18110000,18119999,18110000),
		array('Botucatu',18600000,18617999,18600000),
		array('Presidente Prudente',19000000,19109999,19000000),
		array('Altinópolis',14350000,14389999,14350000),
		array('Campo Limpo Paulista',13230000,13239999,13230000),
		array('Lorena',12600000,12614999,12600000),
		array('Presidente Venceslau',19400000,19409999,19400000),
		array('Rio de Janeiro',20000000,20299999,20000000),
		array('Rio de Janeiro',20500000,23799999,20500000),
		array('Niterói',24000000,24399999,24000000),
		array('Petrópolis',25600000,25779999,25600000),
		array('Teresópolis',25950000,25995999,25950000),
		array('Macaé',27900000,27979999,27900000),
		array('São Gonçalo',24400000,24799999,24400000),
		array('Volta Redonda',27200000,27299999,27200000),
		array('Campos dos Goytacazes',28000000,28099999,28000000),
		array('Vitória',29000000,29099999,29000000),
		array('Vila Velha',29100000,29134999,29100000),
		array('Cariacica',29140000,29159999,29140000),
		array('Serra',29160000,29184999,29160000),
		array('Cachoeiro de Itapemirim',29300000,29320999,29300000),
		array('Colatina',29700000,29719999,29700000),
		array('Linhares',29900000,29919999,29900000),
		array('Guarapari',29200000,29229999,29200000),
		array('Belo Horizonte',30000000,31999999,30000000),
		array('Contagem',32000000,32399999,32000000),
		array('Ibirité',32400000,32499999,32400000),
		array('Betim',32500000,32899999,32500000),
		array('Santa Luzia',33000000,33199999,33000000),
		array('Vespasiano',33200000,33299999,33200000),
		array('Lagoa Santa',33400000,33499999,33400000),
		array('Pedro Leopoldo',33600000,33699999,33600000),
		array('Ribeirão das Neves',33800000,33950999,33800000),
		array('Nova Lima',34000000,34299999,34000000),
		array('Sabará',34500000,34799999,34500000),
		array('Caeté',34800000,34989999,34800000),
		array('Governador Valadares',35000000,35099999,35000000),
		array('Ipatinga',35160000,35164999,35160000),
		array('Divinópolis',35500000,35504999,35500000),
		array('Sete Lagoas',35700000,35704999,35700000),
		array('Juiz de Fora',36000000,36099999,36000000),
		array('Poços de Caldas',37700000,37719999,37700000),
		array('Uberaba',38000000,38099999,38000000),
		array('Uberlândia',38400000,38415999,38400000),
		array('Montes Claros',39400000,39409999,39400000),
		array('Salvador',40000000,42599999,40000000),
		array('Feira de Santana',44000000,44099999,44000000),
		array('Aracaju',49000000,49098999,49000000),
		array('Recife',50000000,52999999,50000000),
		array('Olinda',53000000,53399999,53000000),
		array('Paulista',53400000,53499999,53400000),
		array('Jaboatão dos Guararapes',54000000,54499999,54000000),
		array('Maceió',57000000,57099999,57000000),
		array('João Pessoa',58000000,58099999,58000000),
		array('Natal',59000000,59139999,59000000),
		array('Fortaleza',60000000,60999999,60000000),
		array('Caucaia',61600000,61659999,61600000),
		array('Maracanaú',61900000,61939999,61900000),
		array('Teresina',64000000,64099999,64000000),
		array('São Luis',65000000,65099999,65000000),
		array('Palmas',77000000,77249999,77000000),
		array('Belém',66000000,66999999,66000000),
		array('Ananindeua',67000000,67199999,67000000),
		array('Manaus',69000000,69099999,69000000),
		array('Brasília',70000000,70639999,70000000),
		array('Cruzeiro',70640000,70699999,70640000),
		array('Brasília',70700000,70999999,70700000),
		array('Guará',71000000,71499998,71000000),
		array('Lago Norte',71500000,71569999,71500000),
		array('Lago Sul',71600000,71689999,71700000),
		array('Núcleo Bandeirante',71700000,71799999,71700000),
		array('Taguatinga',72000000,72199999,72000000),
		array('Goiânia',74000000,74799999,74000000),
		array('Aparecida de Goiânia',74800000,74999999,74800000),
		array('Cuiabá',78000000,78099999,78000000),
		array('Campo Grande',79000000,79124999,79000000),
		array('Curitiba',80000000,82999999,80000000),
		array('São José dos Pinhais',83000000,83149999,83000000),
		array('Pinhais',83320000,83349999,83320000),
		array('Colombo',83400000,83415999,83400000),
		array('Cascavel',85800000,85820999,85800000),
		array('Londrina',86000000,86099999,86000000),
		array('Maringá',87000000,87099999,87000000),
		array('Apucarana',86800000,86819999,86800000),
		array('Arapongas',86700000,86709999,86700000),
		array('Cambé',86180000,86199999,86180000),
		array('Rolândia',86600000,86609999,86600000),
		array('Florianópolis',88000000,88099999,88000000),
		array('São Jose',88100000,88123999,88100000),
		array('Palhoça',88130000,88138999,88130000),
		array('Itajaí',88300000,88319999,88300000),
		array('Brusque',88350000,88359999,88350000),
		array('Garopaba',88495000,88495000,88495000),
		array('Criciúma',88800000,88819999,88800000),
		array('Blumenau',89000000,89099999,89000000),
		array('Joinville',89200000,89239999,89200000),
		array('Jaraguá do Sul',89250000,89269999,89250000),
		array('Porto Alegre',90000000,91999999,90000000),
		array('Canoas',92000000,92449999,92000000),
		array('São Leopoldo',93000000,93179999,93000000),
		array('Sapucaia do Sul',93200000,93249999,93200000),
		array('Esteio',93250000,93299999,93250000),
		array('Novo Hamburgo',93300000,93519999,93300000),
		array('Gravataí',94000000,94399999,94000000),
		array('Viamão',94400000,94729999,94400000),
		array('Alvorada',94800000,94889999,94800000),
		array('Cachoeirinha',94900000,94999999,94900000),
		array('Caxias do Sul',95000000,95124999,95000000),
		array('Pelotas',96000000,96099999,96000000),
		array('Santa Maria',97000000,97119999,97000000),
		array('Santo Cristo',98960000,98969999,98960000),
		array('Sapiranga',93800000,93879999,93800000),
	);
	
	/**
	 * Construtor da classe
	 * @see Mage_Core_Model_Resource_Abstract::_construct()
	 */
	protected function _construct(){
        $this->_init('av5_correios/correios', 'id');
    }
	
    /**
     * Recupera os pre�os de frete baseado no request do usu�rio
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return multitype:unknown
     */
    public function getRates(Mage_Shipping_Model_Rate_Request $request) {
        $read = $this->_getReadAdapter();
        $write = $this->_getWriteAdapter();

		$postcode = Mage::helper('av5_correios')->_formatZip($request->getDestPostcode());
        $table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
		
        $pkgWeight = ceil($request->getFixedPackageWeight());
        
		$searchString = " AND (cep_destino_ini <= '" . $postcode . "' AND cep_destino_fim >= '" . $postcode . "') AND peso = '" . $pkgWeight . "'";
		
		
		$select = $read->select()->from($table);
		$select->where(
				$read->quoteInto(" ( servico in (?) ) ", $request->getPostingMethods()).
				$searchString
			);
		
		Mage::log("AV5 Correios: " . $select->assemble());
		
		$newdata=array();
		$row = $read->fetchAll($select);
		if (!empty($row))
		{
			foreach ($row as $data) {
				$newdata[]=$data;
			}
		}
		return $newdata;
    }
    
    /**
     * Lista os registros desatualizados com base nos servi�os, frequencia e limite
     * @param array $postMethods
     * @param int $frequency
     * @param int $limit
     * @return array
     */
    public function listServices($postMethods, $frequency, $limit) {
    	$read = $this->_getReadAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
		
    	//Mage::log("AV5 Correios - PostMethods: " . var_export($postMethods,true));
    	
    	$select = $read->select()->from($table);
    	$select->where("(lastupdate IS NULL OR lastupdate < SUBDATE(NOW(),".$frequency.")) AND servico in (".$postMethods.")");
    	$select->limit($limit);
    	
    	return $read->fetchAll($select);
    }
    
    /**
     * Lista os serviços que precisam de atualização junto com a quantidade de registros
     * desatualizados
     * @param arra $postMethods
     * @param int $frequency
     * @return array
     */
    public function toUpdate($postMethods, $frequency) {
    	$read = $this->_getReadAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
    	
    	$select = $read->select()->from($table,array("servico","count(valor) as total"));
    	$select->where("(lastupdate IS NULL OR lastupdate < SUBDATE(NOW(),".$frequency.")) AND servico in (".$postMethods.")");
    	$select->group("servico");

    	return $read->fetchAll($select);
    }
    
    /**
     * Retorna a quantidade de registros desatualizados de um servi�o
     * @param string $postMethod
     * @param int $frequency
     * @return array
     */
    public function hasToUpdate($postMethod, $frequency) {
    	$read = $this->_getReadAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
    	 
    	$select = $read->select()->from($table,array("servico","count(valor) as total"));
    	$select->where("(lastupdate IS NULL OR lastupdate < SUBDATE(NOW(),".$frequency.")) AND servico = ".$postMethod);
    	$select->group("servico");
		
    	return $read->fetchRow($select);
    }
    
    /**
     * Retorna a quantidade de registros atualizados de um serviço
     * @param string $postMethod
     * @param int $frequency
     * @return array
     */
    public function updatedCount($postMethod, $frequency) {
    	$read = $this->_getReadAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
    
    	$select = $read->select()->from($table,array("servico","count(valor) as total"));
    	$select->where("lastupdate >= SUBDATE(NOW(),".$frequency.") AND servico = ".$postMethod);
    	$select->group("servico");
    	
    	return $read->fetchRow($select);
    }
    
    /**
     * Verifica se o serviço está presente no banco de dados
     * @param string $service
     * @return boolean
     */
    public function isPopulated($service) {
    	$read = $this->_getReadAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
    	 
    	$select = $read->select()->from($table,array("count(valor) as total"));
    	$select->where("servico = ".$service);
    	
    	$result = $read->fetchRow($select);
    	if (!$result['total']) {
    		return false;
    	}
    	
    	return true;
    }
    
    /**
     * Atualiza o serviço informado com os dados recebidos
     * @param int $id
     * @param array $data
     */
    public function updateService($id, $data) {
    	$write = $this->_getWriteAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');

    	$rows = $write->update($table, $data, "id = " . $id);
    }
    
    /**
     * Exclui o serviço informado
     * @param int $id
     */
    public function deleteService($id) {
    	$write = $this->_getWriteAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
    
    	$rows = $write->delete($table, "id = " . $id);
    }
    
    /**
     * Limpa a tabela de preços
     */
    public function cleanDatabase() {
    	$write = $this->_getWriteAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
    
    	$rows = $write->delete($table, "1");
    }
    
    /**
     * Popula o banco de dados com os dados padrão para os serviços informados
     * @param array $services
     * @param double $maxWeight
     * @param string $from
     */
    public function populate($services, $from) {
    	$read = $this->_getReadAdapter();
    	$write = $this->_getWriteAdapter();
    	$table = Mage::getSingleton('core/resource')->getTableName('av5_correios/correios');
    	
    	foreach ($services as $service) {
    		if ($service == "81019") {
    			$defaultData = $this->_81019data;
    		} else {
    			$defaultData = $this->_defaultData;
    		}
    		foreach ($defaultData as $record) {
    			$select = $read->select()->from($table,array("max(peso) as total"));
    			$select->where("servico = ".$service[0]);
    			$select->where("regiao like '".$record[0]."'");
    			$result = $read->fetchRow($select);
    			
    			if (!$result['total']) {
    				$w = $service[4];
    			} else {
	    			$w = ceil($result['total'])+1;
	    			if(!$w) $w = $service[4];
    			}
    			
    			if ($w > $service[3])
    				continue;
    			
    			for($weight = $w; $weight <= $service[3]; $weight++) {
	    			try {
	    				$write->insert($table, array(
		    				'servico' 			=> $service[0],
		    				'nome'				=> $service[1],
		    				'regiao'			=> $record[0],
		    				'prazo'				=> $service[2],
		    				'peso'				=> $weight,
		    				'valor'				=> '0.00',
		    				'cep_origem'		=> $from,
		    				'cep_destino_ini'	=> $record[1],
		    				'cep_destino_fim'	=> $record[2],
		    				'lastupdate'		=> 'NULL',
		    				'cep_destino_ref'	=> $record[3]
		    			));
	    			} catch (Exception $e) {
	    				Mage::log("AV5_Correios Erro: " . $e->getMessage() . " > Serviço: " . $service[1] . "(" . $service[0] . ") - CEP:" . $record[1] . " a " . $record[2] . " - Peso: " . $weight);
	    			}
	    			
	    			# Correção para registrar pesos abaixo de 1Kg
	    			if ($weight < 1) {
	    				$weight = 0;
	    			}
    			}
    		}
    	}
    }
}
