
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import Typography from "../../../components/typography/Typography";
import "./index.css";

function Configuracoes() {
  // TODO: adicionar funcionalidades

  const close = () => {
    window.location.href = "/";
  }
  return (
    <div className="usuarios-container">
      <Modal show={true} onClose={close}>
        <Modal.Title>Em Breve</Modal.Title>
        <Modal.Content>
          <Typography variant={"span"}>Em breve você poderá alterar a quantidade de dias que o sistema</Typography>
          <Typography variant={"span"}>considera para marcar um cliente como inadimplente.</Typography>
          <Button onClick={close}>OK</Button>
        </Modal.Content>
      </Modal>
      <Typography variant={"h3"}>Configurações</Typography>
      <div>

        <Input outerClassname="usuarios-w400" label={'Dias para ficar inadimplente'} placeholder={""} />
        <Button onClick={() => { }}>Salvar</Button>
      </div>
    </div>
  );
}

export default Configuracoes;
